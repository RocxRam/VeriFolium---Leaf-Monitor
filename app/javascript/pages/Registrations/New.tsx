import React from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
import AuthBackground from '../../components/AuthBackground'
import { Alert } from '../../components/Utils'
import { signup_path, login_path, root_path } from '@/routes'

export default function New() {
  const { flash } = usePage().props as any
  const { data, setData, post, processing, errors } = useForm({
    email_address: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(signup_path())
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-10">
      <AuthBackground />
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <Link href={root_path()} className="inline-flex items-center justify-center gap-3 mb-4 no-underline">
            <div className="w-14 h-14 gradient-primary rounded-2xl center-flex shadow-xl">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <div>
              <span className="font-bold text-2xl text-slate-900 block">VeriFolium</span>
              <span className="text-sm text-neutral-500">Crop intelligence for modern farms</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Create your account</h1>
          <p className="text-neutral-600 text-base max-w-xl mx-auto">
            Start diagnosing crop health instantly, with trusted AI recommendations designed for farmers.
          </p>
        </div>

        {/* Alerts */}
        {flash?.alert && (
          <div className="mb-6">
            <Alert type="error" title="Registration Failed">
              {flash.alert}
            </Alert>
          </div>
        )}

        {/* Signup Form Card */}
        <Card elevated>
          <CardBody className="space-y-6">
            <form onSubmit={submit} className="space-y-5">
              {/* Email Field */}
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={data.email_address}
                onChange={(e) => setData('email_address', e.target.value)}
                required
                autoFocus
                autoComplete="email"
                error={errors.email_address}
              />

              {/* Password Field */}
              <Input
                type="password"
                label="Password"
                placeholder="Create a password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
                autoComplete="new-password"
                error={errors.password}
              />

              {/* Password Confirmation Field */}
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
                autoComplete="new-password"
                error={errors.password_confirmation}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={processing}
                disabled={processing}
              >
                Sign Up
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link href={login_path()} className="text-primary-600 hover:text-primary-700 font-semibold no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
