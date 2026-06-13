import React, { useState } from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
import { Alert } from '../../components/Utils'
import { login_path } from '@/routes'

interface Props {
  email_address?: string
}

export default function New({ email_address }: Props) {
  const { flash } = usePage();
  const { data, setData, post, processing, errors } = useForm({
    email_address: email_address || '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post(login_path())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4 no-underline">
            <div className="w-12 h-12 gradient-primary rounded-lg center-flex">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <span className="font-bold text-2xl text-neutral-900">VeriFolium</span>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Sign in to your VeriFolium account</p>
        </div>

        {/* Alerts */}
        {flash.alert && (
          <div className="mb-6">
            <Alert type="error" title="Login Failed">
              {flash.alert}
            </Alert>
          </div>
        )}

        {flash.notice && (
          <div className="mb-6">
            <Alert type="success" title="Success">
              {flash.notice}
            </Alert>
          </div>
        )}

        {/* Login Form Card */}
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
                autoComplete="username"
                error={errors.email_address}
              />

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input pr-10 ${errors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    autoComplete="current-password"
                    maxLength={72}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    defaultChecked
                  />
                  <span className="text-sm text-neutral-600">Remember me</span>
                </label>
                <Link href="/passwords/new" className="text-sm text-primary-600 hover:text-primary-700 font-medium no-underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={processing}
                disabled={processing}
              >
                Sign In
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-semibold no-underline">
              Create one now
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center mb-4">Why choose VeriFolium?</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl mb-1">🔒</p>
              <p className="text-xs text-neutral-600">Secure</p>
            </div>
            <div className="text-center">
              <p className="text-xl mb-1">⚡</p>
              <p className="text-xs text-neutral-600">Fast</p>
            </div>
            <div className="text-center">
              <p className="text-xl mb-1">🌍</p>
              <p className="text-xs text-neutral-600">Global</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}