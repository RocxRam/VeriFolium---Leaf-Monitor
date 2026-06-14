import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { edit_profile_path, new_scan_path } from '@/routes'
import { Link } from '@inertiajs/react'

interface Profile {
  land_size: string | null
  crops: string | null
  soil_type: string | null
  location: string | null
}

interface Scan {
  id: number
  disease_name: string
  created_at: string
}

interface DashboardProps {
  profile: Profile | null
  scans: Scan[]
}

const weatherEmoji = (description: string) => {
  const value = description.toLowerCase()
  if (value.includes('thunder')) return '⛈️'
  if (value.includes('drizzle')) return '🌦️'
  if (value.includes('rain')) return '🌧️'
  if (value.includes('snow')) return '❄️'
  if (value.includes('mist') || value.includes('fog') || value.includes('haze')) return '🌫️'
  if (value.includes('clear')) return '☀️'
  if (value.includes('cloud')) return '☁️'
  if (value.includes('smoke') || value.includes('dust') || value.includes('sand') || value.includes('ash')) return '🌪️'
  return '🌤️'
}

function Index({ profile, scans }: DashboardProps) {
  const [weather, setWeather] = useState<{ today: any; tomorrow: any } | null>(null)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [loadingWeather, setLoadingWeather] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherError('Geolocation is not supported in this browser.')
      return
    }

    setLoadingWeather(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(`/dashboard/weather?lat=${latitude}&lon=${longitude}`)
          if (!response.ok) {
            const payload = await response.json()
            throw new Error(payload.error || 'Unable to fetch weather')
          }
          const payload = await response.json()
          setWeather(payload)
        } catch (error: any) {
          setWeatherError(error?.message || 'Unable to load weather')
        } finally {
          setLoadingWeather(false)
        }
      },
      (error) => {
        setWeatherError(error.message || 'Permission denied for location')
        setLoadingWeather(false)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 600000 },
    )
  }, [])

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
            {scans.length > 0 ? (
              <div className="space-y-3 mb-6">
                {scans.map((scan) => (
                  <Link
                    key={scan.id}
                    href={`/scans/${scan.id}`}
                    className="block p-3 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-primary-200 transition-colors no-underline"
                  >
                    <div className="font-semibold text-neutral-800">{scan.disease_name}</div>
                    <div className="text-xs text-neutral-500">
                      {new Date(scan.created_at).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 center-flex text-3xl mb-4 opacity-50">📋</div>
                <p className="text-neutral-500 max-w-[200px]">
                  No recent diagnoses found. Start scanning your crops to see insights here.
                </p>
              </div>
            )}
            <div className="mt-auto">
              <Link href={new_scan_path()} className="btn btn-primary btn-full no-underline">
                New Scan
              </Link>
            </div>
          </CardBody>
        </Card>

        <Card className="card-elevated h-full">
          <CardBody>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-10 h-10 rounded-lg gradient-accent center-flex text-xl shadow-sm">🌡️</span>
              Local Conditions
            </h2>
            {loadingWeather ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 center-flex text-3xl mb-4 animate-pulse">⏳</div>
                <p className="text-neutral-500">Loading weather for your location…</p>
              </div>
            ) : weather ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/90 rounded-3xl border border-neutral-800">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Today</p>
                    <p className="text-3xl font-bold mt-3">{weatherEmoji(weather.today.description)} {Math.round(weather.today.temp)}°C</p>
                    <p className="text-sm text-slate-300 capitalize">{weather.today.description}</p>
                    <p className="text-sm text-slate-400 mt-2">Feels like {Math.round(weather.today.feels_like)}°C</p>
                  </div>
                  <div className="p-4 bg-slate-950/90 rounded-3xl border border-neutral-800">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Tomorrow</p>
                    <p className="text-3xl font-bold mt-3">{weatherEmoji(weather.tomorrow.description)} {Math.round(weather.tomorrow.max)}° / {Math.round(weather.tomorrow.min)}°</p>
                    <p className="text-sm text-slate-300 capitalize">{weather.tomorrow.description}</p>
                    <p className="text-sm text-slate-400 mt-2">Humidity {weather.tomorrow.humidity}%</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                  <div className="rounded-3xl bg-neutral-950/90 p-4 border border-neutral-800">
                    <p className="font-semibold text-slate-200 mb-2">Wind Speed</p>
                    <p>{weather.today.wind_speed} m/s</p>
                  </div>
                  <div className="rounded-3xl bg-neutral-950/90 p-4 border border-neutral-800">
                    <p className="font-semibold text-slate-200 mb-2">Humidity</p>
                    <p>{weather.today.humidity}%</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 center-flex text-3xl mb-4 opacity-50">☁️</div>
                <p className="text-neutral-500 max-w-[200px] italic">
                  {weatherError || 'Connect your location to see real-time weather conditions.'}
                </p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  )
}

Index.layout = (page: any) => <Layout title="Dashboard">{page}</Layout>

export default Index
