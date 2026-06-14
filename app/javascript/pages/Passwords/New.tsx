import React from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
import AuthBackground from '../../components/AuthBackground'
import { Alert } from '../../components/Utils'

interface Props {
  email_address?: string
}

export default function New({ email_address }: Props) {
  const { flash } = usePage()
  const { data, setData, post, processing, errors } = useForm({
    email_address: email_address || '',
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/passwords')
  }

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
              <span className="text-sm text-neutral-500">Secure access made simple</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Reset your password</h1>
          <p className="text-neutral-600 text-base max-w-xl mx-auto">
            Enter your email and we’ll send a secure link to restore access to your account.
          </p>
        </div>

        {/* Alerts */}
        {flash.alert && (
          <div className="mb-6">
            <Alert type="success" title="Instructions Sent">
              {flash.alert}
            </Alert>
          </div>
        )}

        {/* Reset Form Card */}
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
                helpText="Enter the email address associated with your account"
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
                Send Reset Instructions
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Back to Login Link */}
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Remember your password?{' '}
            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-semibold no-underline">
              Back to login
            </Link>
          </p>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> Check your spam folder if you don't receive the password reset email within a few minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}