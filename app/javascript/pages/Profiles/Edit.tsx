import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { profile_path, dashboard_path } from '@/routes'
import { useForm, Link } from '@inertiajs/react'

interface Profile {
  land_size: string | number | null
  crops: string | null
  soil_type: string | null
  location: string | null
  preferred_language: string | null
}

interface EditProps {
  profile: Profile
}

function Edit({ profile }: EditProps) {
  const { data, setData, patch, processing, errors } = useForm({
    land_size: profile.land_size || '',
    crops: profile.crops || '',
    soil_type: profile.soil_type || '',
    location: profile.location || '',
    preferred_language: profile.preferred_language || 'English',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patch(profile_path())
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href={dashboard_path()} className="text-sm font-medium text-primary-600 hover:text-primary-700 no-underline flex items-center gap-1 transition-transform hover:-translate-x-1">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-2">Update Agricultural Profile</h1>
        <p className="text-neutral-500 mt-2">Provide details about your farm to get more accurate crop disease diagnosis.</p>
      </div>

      <Card className="card-elevated">
        <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="land_size" className="form-label">Land Size (Acres)</label>
              <div className="relative">
                <input
                  id="land_size"
                  type="number"
                  step="0.01"
                  className="form-input pl-10"
                  placeholder="0.00"
                  value={data.land_size}
                  onChange={e => setData('land_size', e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">📏</span>
              </div>
              {errors.land_size && <div className="form-error">{errors.land_size}</div>}
              <p className="form-help">Total cultivable area in acres.</p>
            </div>

            <div className="form-group">
              <label htmlFor="crops" className="form-label">Crops Planted</label>
              <textarea
                id="crops"
                className="form-textarea"
                placeholder="e.g. Wheat, Maize, Tomatoes..."
                value={data.crops || ''}
                onChange={e => setData('crops', e.target.value)}
              />
              {errors.crops && <div className="form-error">{errors.crops}</div>}
              <p className="form-help">List the main crops you are currently growing.</p>
            </div>

            <div className="form-group">
              <label htmlFor="soil_type" className="form-label">Soil Type</label>
              <select
                id="soil_type"
                className="form-select"
                value={data.soil_type || ''}
                onChange={e => setData('soil_type', e.target.value)}
              >
                <option value="">Select soil type</option>
                <option value="Loamy">Loamy</option>
                <option value="Clayey">Clayey</option>
                <option value="Sandy">Sandy</option>
                <option value="Silty">Silty</option>
                <option value="Peaty">Peaty</option>
                <option value="Chalky">Chalky</option>
              </select>
              {errors.soil_type && <div className="form-error">{errors.soil_type}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">Location</label>
              <div className="relative">
                <input
                  id="location"
                  type="text"
                  className="form-input pl-10"
                  placeholder="Region, City, or Coordinates"
                  value={data.location || ''}
                  onChange={e => setData('location', e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">📍</span>
              </div>
              {errors.location && <div className="form-error">{errors.location}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="preferred_language" className="form-label">Preferred Language</label>
              <input
                id="preferred_language"
                type="text"
                className="form-input"
                placeholder="e.g. English, Spanish, Tamil..."
                value={data.preferred_language || ''}
                onChange={e => setData('preferred_language', e.target.value)}
              />
              {errors.preferred_language && <div className="form-error">{errors.preferred_language}</div>}
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-neutral-100">
              <Link href={dashboard_path()} className="btn btn-outline px-8 no-underline">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary px-8 shadow-lg hover:shadow-primary-200"
                disabled={processing}
              >
                {processing ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

Edit.layout = (page: any) => <Layout title="Edit Profile">{page}</Layout>

export default Edit
