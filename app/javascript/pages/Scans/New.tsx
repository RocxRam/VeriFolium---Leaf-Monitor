import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { useForm } from '@inertiajs/react'
import { useState } from 'react'

function New() {
  const { data, setData, post, processing, errors } = useForm({
    image: null as File | null,
  })
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setData('image', file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/scans')
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
              disabled={processing || !data.image}
            >
              {processing ? 'Analyzing...' : 'Diagnose Disease'}
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

New.layout = (page: any) => <Layout title="New Scan">{page}</Layout>

export default New
