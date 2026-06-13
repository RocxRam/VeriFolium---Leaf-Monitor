import React, { useState } from 'react'
import { Link } from '@inertiajs/react'

interface NavbarProps {
  user?: { name: string; email: string } | null
  title?: string
}

export default function Navbar({ user, title = 'VeriFolium' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-40">
      <div className="container-app">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline">
            <div className="w-10 h-10 gradient-primary rounded-lg center-flex">
              <span className="text-white font-bold text-lg">🌿</span>
            </div>
            <span className="font-bold text-xl text-neutral-900 hidden sm:inline">{title}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
              About
            </Link>
            {user && (
              <Link href="/dashboard" className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full gradient-primary center-flex">
                    <span className="text-white font-semibold text-sm">{user.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-900">{user.name}</span>
                    <span className="text-xs text-neutral-500">{user.email}</span>
                  </div>
                </div>
                <form method="POST" action="/logout" className="inline">
                  <button type="submit" className="btn btn-outline btn-sm">
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm no-underline">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm no-underline">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-neutral-600 hover:text-primary-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-neutral-200">
            <div className="py-2 space-y-2">
              <Link
                href="/about"
                className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              {!user && (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
