import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { edit_profile_path } from '@/routes'
import { Link } from '@inertiajs/react'

interface Profile {
  land_size: string | null
  crops: string | null
  soil_type: string | null
  location: string | null
}

interface DashboardProps {
  profile: Profile | null
}

function Index({ profile }: DashboardProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href={edit_profile_path()} className="btn btn-primary no-underline">
          {profile ? 'Edit Profile' : 'Create Profile'}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="card-elevated h-full">
          <CardBody>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg gradient-primary center-flex text-xl shadow-sm">🌾</span>
              Agricultural Profile
            </h2>
            {profile ? (
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Land Size</span>
                  <span className="font-semibold text-neutral-800">{profile.land_size} acres</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Crops Planted</span>
                  <span className="font-semibold text-neutral-800">{profile.crops || 'Not specified'}</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Soil Type</span>
                  <span className="font-semibold text-neutral-800">{profile.soil_type || 'Not specified'}</span>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 shadow-sm">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-1">Location</span>
                  <span className="font-semibold text-neutral-800">{profile.location || 'Not specified'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-neutral-600 mb-6">
                  You haven't set up your agricultural profile yet. Please add your information to get better crop health insights.
                </p>
                <Link href={edit_profile_path()} className="btn btn-outline btn-sm no-underline w-full">
                  Complete Profile
                </Link>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="card-elevated h-full">
          <CardBody>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg gradient-secondary center-flex text-xl shadow-sm">🔍</span>
              Recent Diagnoses
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 center-flex text-3xl mb-4 opacity-50">📋</div>
              <p className="text-neutral-500 max-w-[200px]">
                No recent diagnoses found. Start scanning your crops to see insights here.
              </p>
            </div>
            <div className="mt-auto">
              <button className="btn btn-primary btn-full opacity-50 cursor-not-allowed" disabled title="Coming soon!">
                New Scan
              </button>
            </div>
          </CardBody>
        </Card>

        <Card className="card-elevated h-full">
          <CardBody>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg gradient-accent center-flex text-xl shadow-sm">🌡️</span>
              Local Conditions
            </h2>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-neutral-100 center-flex text-3xl mb-4 opacity-50">☁️</div>
              <p className="text-neutral-500 max-w-[200px] italic">
                Connect your location to see real-time weather and soil conditions.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

Index.layout = (page: any) => <Layout title="Dashboard">{page}</Layout>

export default Index
