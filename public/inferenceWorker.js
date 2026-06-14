/* Web Worker for TFJS inference
   - Loads TensorFlow.js via CDN
   - Loads a model from /ml_models/my_model/model.json by default
   - Supports messages: {type:'init' | 'warmup' | 'predict' | 'dispose', id, payload}
   - Uses tf.tidy() for safe memory management
   - Sends back messages with same `id` so the main thread can correlate responses
*/

self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.9.0/dist/tf.min.js');

let model = null;
let modelPathDefault = '/ml_models/my_model/model.json';

async function loadModel(path) {
  if (model) return model;
  // Try GraphModel first, fallback to LayersModel
  try {
    model = await tf.loadGraphModel(path);
  } catch (err) {
    model = await tf.loadLayersModel(path);
  }
  return model;
}

function getInputShape(m) {
  if (!m || !m.inputs || !m.inputs.length) return [1, 224, 224, 3];
  const s = m.inputs[0].shape || m.inputs[0].batchShape || m.inputs[0];
  // Replace `null` or `undefined` with 1 for batch dim
  return s.map((v) => (v == null ? 1 : v));
}

async function warmupModel(m) {
  const shape = getInputShape(m);
  await tf.tidy(() => {
    const zeros = tf.zeros(shape);
    const out = (m.predict ? m.predict(zeros) : m.execute(zeros));
    if (Array.isArray(out)) out.forEach((t) => t && t.dataSync());
    else if (out) out.dataSync();
  });
}

self.addEventListener('message', async (e) => {
  const { type, id, payload } = e.data || {};

  try {
    if (type === 'init') {
      await tf.ready();
      const path = payload && payload.path ? payload.path : modelPathDefault;
      await loadModel(path);
      self.postMessage({ type: 'inited', id });
      return;
    }

    if (type === 'warmup') {
      const path = payload && payload.path ? payload.path : modelPathDefault;
      await loadModel(path);
      await warmupModel(model);
      self.postMessage({ type: 'warmed', id });
      return;
    }

    if (type === 'predict') {
      const path = payload && payload.path ? payload.path : modelPathDefault;
      await loadModel(path);

      // Expect payload.input to contain { data: Float32Array|number[], shape: number[], dtype?: string }
      const input = payload && payload.input;
      if (!input) throw new Error('Missing input payload');

      // Use synchronous dataSync inside tidy to safely extract results before tensors are disposed
      const result = tf.tidy(() => {
        const t = tf.tensor(input.data, input.shape, input.dtype || 'float32');
        let out = null;
        if (model.predict) out = model.predict(t);
        else out = model.execute(t);

        // Normalize to array of tensors
        const outs = Array.isArray(out) ? out : [out];
        // Materialize numeric data for transfer
        const dataArrays = outs.map((tensor) => {
          const arr = tensor.dataSync();
          return { data: Array.from(arr), shape: tensor.shape, dtype: tensor.dtype };
        });

        // dispose outs if they are tensors (tf.tidy will do most cleanup, but be explicit)
        outs.forEach((t) => t && t.dispose && t.dispose());
        t.dispose();

        return dataArrays;
      });

      self.postMessage({ type: 'result', id, result });
      return;
    }

    // Image-based prediction: accepts transferable ImageBitmap / ImageData / OffscreenCanvas
    if (type === 'predict_image') {
      const path = payload && payload.path ? payload.path : modelPathDefault;
      await loadModel(path);

      const img = payload && payload.image;
      if (!img) throw new Error('Missing image payload');

      // Placeholder resize dims and normalization: replace PLACEHOLDER_H/W and normalization logic
      // Use the model's training image size by default (height x width)
      const PLACEHOLDER_H = payload && payload.height ? payload.height : 180;
      const PLACEHOLDER_W = payload && payload.width ? payload.width : 180;

      const result = tf.tidy(() => {
        // 1) Conversion
        const imgTensor = tf.browser.fromPixels(img);

        // 2) Resizing
        const resized = tf.image.resizeBilinear(imgTensor, [PLACEHOLDER_H, PLACEHOLDER_W]);

        // 3) Normalization: model expects pixel values in range [0, 1]
        const normalized = resized.div(tf.scalar(255));

        // 4) Batching
        const batched = normalized.expandDims(0);

        // 5) Inference
        let out = null;
        if (model.predict) out = model.predict(batched);
        else out = model.execute(batched);

        const outs = Array.isArray(out) ? out : [out];

        // 6) Materialize results synchronously
        const dataArrays = outs.map((tensor) => {
          const arr = tensor.dataSync();
          return { data: Array.from(arr), shape: tensor.shape, dtype: tensor.dtype };
        });

        return dataArrays;
      });

      self.postMessage({ type: 'result', id, result });
      return;
    }

    if (type === 'dispose') {
      if (model && model.dispose) model.dispose();
      model = null;
      self.postMessage({ type: 'disposed', id });
      return;
    }

    self.postMessage({ type: 'error', id, error: 'Unknown message type: ' + String(type) });
  } catch (err) {
    self.postMessage({ type: 'error', id, error: (err && err.message) || String(err) });
  }
});
