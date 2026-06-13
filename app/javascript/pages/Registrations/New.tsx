import React, { useState } from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
import { Alert } from '../../components/Utils'
import { signup_path, login_path, root_path } from '@/routes'

export default function New() {
  const { props } = usePage<any>();
  const { flash } = props;
  const { data, setData, post, processing, errors } = useForm({
    email_address: '',
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(signup_path())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href={root_path()} className="flex items-center justify-center gap-2 mb-4 no-underline">
            <div className="w-12 h-12 gradient-primary rounded-lg center-flex">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <span className="font-bold text-2xl text-neutral-900">VeriFolium</span>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h1>
          <p className="text-neutral-600">Join VeriFolium to start diagnosing your crops</p>
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
                type={showPassword ? 'text' : 'password'}
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
                type={showPassword ? 'text' : 'password'}
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
