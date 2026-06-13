import React from 'react'
import { useForm, Link, usePage } from '@inertiajs/react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import Card, { CardBody } from '../../components/Card'
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Reset Password</h1>
          <p className="text-neutral-600">We'll send you instructions to reset your password</p>
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