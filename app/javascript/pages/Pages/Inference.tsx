import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import useInferenceWorker from '../../hooks/useInferenceWorker'

function Inference() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const { ready, warmup, predictImage } = useInferenceWorker('/ml_models/my_model/model.json')

  useEffect(() => {
    if (ready) {
      warmup().catch(() => {})
    }
  }, [ready, warmup])

  const handleFile = async (file: File | null) => {
    setResult(null)
    setSelectedFile(file)
    if (!file) {
      setPreviewSrc(null)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewSrc(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    await handleFile(file)
  }

  const runInference = async () => {
    if (!selectedFile) return
    setLoading(true)
    setResult(null)

    try {
      const bitmap = await createImageBitmap(selectedFile)
      const response = await predictImage(bitmap, 224, 224)
      setResult(JSON.stringify(response, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error?.message || 'Prediction failed'}`)
    } finally {
      setLoading(false)
    }
  }

  const runSample = async () => {
    setLoading(true)
    setResult(null)

    try {
      const canvas = document.createElement('canvas')
      canvas.width = 224
      canvas.height = 224
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Unable to create canvas context')

      ctx.fillStyle = '#e0f2fe'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#2563eb'
      ctx.fillRect(16, 24, 148, 72)
      ctx.fillStyle = '#16a34a'
      ctx.fillRect(16, 110, 82, 46)
      ctx.fillStyle = '#facc15'
      ctx.beginPath()
      ctx.arc(136, 130, 28, 0, Math.PI * 2)
      ctx.fill()

      const bitmap = await createImageBitmap(canvas)
      setPreviewSrc(canvas.toDataURL())
      const prediction = await predictImage(bitmap, 224, 224)
      setResult(JSON.stringify(prediction, null, 2))
    } catch (error: any) {
      setResult(`Error: ${error?.message || 'Sample prediction failed'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section max-w-5xl mx-auto">
      <div className="card-elevated p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Image Inference</h1>
          <p className="text-neutral-600 mt-3">
            Upload an image to run browser-side TensorFlow.js inference using the worker.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Upload image</label>
            <input type="file" accept="image/*" onChange={handleUpload} className="file-input w-full" />

            {previewSrc && (
              <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-sm">
                <img src={previewSrc} alt="Preview" className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="space-y-2">
              <Button type="button" onClick={runInference} disabled={!ready || !selectedFile || loading} loading={loading} fullWidth>
                {ready ? 'Run Prediction' : 'Loading model...'}
              </Button>
              <Button type="button" variant="secondary" onClick={runSample} disabled={!ready || loading} loading={false} fullWidth>
                Run Sample Image
              </Button>
              <p className="text-sm text-neutral-500">
                Model path: <code>/ml_models/my_model/model.json</code>
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-950/95 p-6 text-white shadow-xl min-h-[280px]">
            <h2 className="text-xl font-semibold mb-4">Prediction output</h2>
            <div className="overflow-auto max-h-[420px] rounded-2xl bg-slate-900 p-4">
              <pre className="whitespace-pre-wrap text-sm leading-6">{result ?? 'Awaiting image upload and prediction...'}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Inference.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

export default Inference
