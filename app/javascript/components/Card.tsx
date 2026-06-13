import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  elevated?: boolean
}

export default function Card({ children, className = '', elevated = false }: CardProps) {
  const cardClass = elevated ? 'card-elevated' : 'card'
  return (
    <div className={`${cardClass} ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-neutral-200 ${className}`}>
      {children}
    </div>
  )
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`card-base ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-6 py-4 border-t border-neutral-200 bg-neutral-50 ${className}`}>
      {children}
    </div>
  )
}
