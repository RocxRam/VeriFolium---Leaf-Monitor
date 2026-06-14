import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { useForm } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import useInferenceWorker from '../../hooks/useInferenceWorker'
import { scans_path } from '@/routes'

function New() {
  const { data, setData, post, processing, errors } = useForm({
    image: null as File | null,
    disease_name: '',
    confidence_score: 0,
  })
  const [preview, setPreview] = useState<string | null>(null)
  const [inferencing, setInferencing] = useState(false)
  
  const LABELS = [
    "Wheat_Aphid", "Wheat_BlackRust", "Wheat_Blast", "Wheat_BrownRust", "Wheat_CommonRootRot", 
    "Wheat_FusariumHeadBlight", "Wheat_LeafBlight", "Wheat_Mildew", "Wheat_Mite", "Wheat_Septoria", 
    "Wheat_Smut", "Wheat_Stemfly", "Wheat_Tanspot", "Wheat_YellowRust", "Wheat_Healthy",
    "Rice_BrownSpot", "Rice_Hispa", "Rice_LeafBlast", "Rice_Healthy",
    "Potato_Early_Blight", "Potato_Late_Blight", "Potato_Healthy",
    "Corn_Common_Rust", "Corn_Gray_Leaf_Spot", "Corn_Northern_Leaf_Blight", "Corn_Healthy"
  ];

  const { ready, warmup, predictImage } = useInferenceWorker('/ml_models/my_model/model.json')

  useEffect(() => {
    if (ready) warmup().catch(() => {})
  }, [ready, warmup])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setData('image', file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.image) return

    setInferencing(true)
    try {
      const bitmap = await createImageBitmap(data.image)
      const result = await predictImage(bitmap, 224, 224) 
      const logits = result[0].data;

      // Apply Softmax to convert logits to probabilities
      const maxLogit = Math.max(...logits);
      const scores = logits.map(l => Math.exp(l - maxLogit));
      const sum = scores.reduce((a, b) => a + b, 0);
      const probabilities = scores.map(s => s / sum);

      // Find the highest probability
      let maxIdx = 0;
      let maxProb = -1;
      for (let i = 0; i < probabilities.length; i++) {
        if (probabilities[i] > maxProb) {
          maxProb = probabilities[i];
          maxIdx = i;
        }
      }

      console.log('Detected Index:', maxIdx, 'Confidence:', maxProb);

      // Update state
      setData({
        ...data,
        disease_name: LABELS[maxIdx] || `Unknown (${maxIdx})`,
        confidence_score: maxProb
      })

      // Submit using internal form state
      setTimeout(() => {
        post(scans_path())
      }, 0)
    } catch (error) {
      console.error('Inference failed', error)
      alert('Local inference failed. Please try again.')
      setInferencing(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">New Crop Scan</h1>
      <Card className="card-elevated">
        <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="form-label">Upload Crop Image</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="form-input p-2"
                onChange={handleFileChange}
              />
              {errors.image && <div className="form-error">{errors.image}</div>}
            </div>

            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="max-w-full rounded-lg shadow-md" />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={processing || !data.image || !ready || inferencing}
            >
              {processing || inferencing ? 'Processing...' : 'Diagnose Disease'}
            </button>
            {!ready && <p className="text-sm text-neutral-500 text-center">Loading model...</p>}
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

New.layout = (page: any) => <Layout title="New Scan">{page}</Layout>

export default New
