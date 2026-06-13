import React from 'react'

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  const badgeClass = `badge badge-${variant}`
  return <span className={`${badgeClass} ${className}`}>{children}</span>
}

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
}

export function Alert({ type = 'info', title, children, className = '', onClose }: AlertProps) {
  const alertClass = `alert alert-${type}`

  const icons = {
    success: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  }

  return (
    <div className={`${alertClass} ${className}`}>
      {icons[type]}
      <div className="flex-1">
        {title && <p className="font-semibold mb-1">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 text-current hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  )
}

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  primaryAction?: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  image?: string
  imageAlt?: string
  centered?: boolean
}

export function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  image,
  imageAlt = 'Hero image',
  centered = true,
}: HeroProps) {
  const content = (
    <div className={`space-y-6 ${centered ? 'text-center' : ''}`}>
      {subtitle && <p className="text-primary-600 font-semibold uppercase tracking-wide text-sm">{subtitle}</p>}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
      {description && <p className="text-lg text-neutral-600 max-w-2xl mx-auto">{description}</p>}
      {(primaryAction || secondaryAction) && (
        <div className={`flex gap-4 flex-wrap ${centered ? 'justify-center' : ''}`}>
          {primaryAction && (
            <a href={primaryAction.href} className="btn btn-primary btn-lg no-underline">
              {primaryAction.text}
            </a>
          )}
          {secondaryAction && (
            <a href={secondaryAction.href} className="btn btn-outline btn-lg no-underline">
              {secondaryAction.text}
            </a>
          )}
        </div>
      )}
    </div>
  )

  if (image) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>{content}</div>
        <div className="order-first md:order-last">
          <img src={image} alt={imageAlt} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    )
  }

  return content
}
