import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | string[]
  helpText?: string
  icon?: React.ReactNode
}

export default function Input({
  label,
  error,
  helpText,
  icon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random()}`

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`form-input ${icon ? 'pl-10' : ''} ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      {helpText && !error && <p className="form-help">{helpText}</p>}
    </div>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helpText?: string
}

export function TextArea({
  label,
  error,
  helpText,
  id,
  className = '',
  ...props
}: TextAreaProps) {
  const textareaId = id || `textarea-${Math.random()}`

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`form-textarea ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
      {helpText && !error && <p className="form-help">{helpText}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helpText?: string
  options: Array<{ value: string; label: string }>
}

export function Select({
  label,
  error,
  helpText,
  options,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random()}`

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {props.required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
      {helpText && !error && <p className="form-help">{helpText}</p>}
    </div>
  )
}
