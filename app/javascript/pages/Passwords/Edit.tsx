import React, { useState } from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
import AuthBackground from '../../components/AuthBackground'
import { Alert } from '../../components/Utils'

interface Props {
  token: string
}

export default function Edit({ token }: Props) {
  const { flash } = usePage()
  const { data, setData, put, processing, errors } = useForm({
    password: '',
    password_confirmation: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    put(`/passwords/${token}`)
  }

  const passwordStrength = (password: string) => {
    if (!password) return { score: 0, label: '', color: '' }
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    const strengthLevels = [
      { score: 0, label: '', color: '' },
      { score: 1, label: 'Weak', color: 'bg-red-500' },
      { score: 2, label: 'Fair', color: 'bg-yellow-500' },
      { score: 3, label: 'Good', color: 'bg-blue-500' },
      { score: 4, label: 'Strong', color: 'bg-primary-500' },
      { score: 5, label: 'Very Strong', color: 'bg-primary-600' },
    ]

    return strengthLevels[score] || strengthLevels[0]
  }

  const strength = passwordStrength(data.password)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-10">
      <AuthBackground />
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-4 no-underline">
            <div className="w-14 h-14 gradient-primary rounded-2xl center-flex shadow-xl">
              <span className="text-white font-bold text-xl">🌿</span>
            </div>
            <div>
              <span className="font-bold text-2xl text-slate-900 block">VeriFolium</span>
              <span className="text-sm text-neutral-500">Secure your account with confidence</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Create a stronger password</h1>
          <p className="text-neutral-600 text-base max-w-xl mx-auto">
            Choose a secure password that keeps your crop insights safe and your team confident.
          </p>
        </div>

        {/* Alerts */}
        {flash.alert && (
          <div className="mb-6">
            <Alert type="error" title="Error">
              {flash.alert}
            </Alert>
          </div>
        )}

        {/* Reset Form Card */}
        <Card elevated>
          <CardBody className="space-y-6">
            <form onSubmit={submit} className="space-y-5">
              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input pr-10 ${errors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                    placeholder="Enter new password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    autoComplete="new-password"
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

                {/* Password Strength Indicator */}
                {data.password && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${(strength.score / 5) * 100}%` }}
                        />
                      </div>
                      {strength.label && <span className="text-xs font-semibold text-neutral-600">{strength.label}</span>}
                    </div>
                    <div className="text-xs text-neutral-500 space-y-1">
                      <p>✓ At least 8 characters</p>
                      <p>✓ Mix of uppercase and lowercase</p>
                      <p>✓ Include numbers and special characters</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-input pr-10 ${
                      errors.password_confirmation ? 'border-red-300 focus:ring-red-500' : ''
                    } ${
                      data.password_confirmation &&
                      data.password !== data.password_confirmation &&
                      'border-yellow-300 focus:ring-yellow-500'
                    }`}
                    placeholder="Confirm password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    required
                    autoComplete="new-password"
                    maxLength={72}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
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
                {errors.password_confirmation && <p className="form-error">{errors.password_confirmation}</p>}
                {data.password_confirmation &&
                  data.password !== data.password_confirmation && (
                    <p className="mt-1 text-sm text-yellow-600 font-medium">Passwords do not match</p>
                  )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={processing}
                disabled={
                  processing ||
                  !data.password ||
                  data.password !== data.password_confirmation
                }
              >
                Update Password
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold no-underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}