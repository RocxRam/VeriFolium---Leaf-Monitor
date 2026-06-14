import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { root_path, about_path, about_team_path, about_technology_path, login_path, logout_path, signup_path } from '@/routes'

interface NavbarProps {
  title?: string
}

export default function Navbar({ title = 'VeriFolium' }: NavbarProps) {
  const { auth } = usePage().props as any
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="bg-white/90 border border-white/70 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sticky top-0 z-40">
      <div className="container-app">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={root_path()} className="flex items-center gap-3 no-underline">
            <div className="w-11 h-11 gradient-primary rounded-2xl center-flex shadow-lg">
              <span className="text-white font-bold text-lg">🌿</span>
            </div>
            <div>
              <span className="font-bold text-xl text-slate-900 block">{title}</span>
              <span className="text-xs text-neutral-500 uppercase tracking-[0.15em]">Crop health intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={about_path()} className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
              About
            </Link>
            <Link href={about_team_path()} className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
              Team
            </Link>
            <Link href={about_technology_path()} className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
              Technology
            </Link>
            {auth.user && (
              <Link href="/dashboard" className="text-neutral-600 hover:text-primary-600 no-underline font-medium transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center gap-3">
            {auth.user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full gradient-primary center-flex">
                    <span className="text-white font-semibold text-sm">{auth.user.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-neutral-900">{auth.user.name}</span>
                    <span className="text-xs text-neutral-500">{auth.user.email}</span>
                  </div>
                </div>
                <Link href={logout_path()} method="delete" as="button" className="btn btn-outline btn-sm">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href={login_path()} className="btn btn-outline btn-sm no-underline">
                  Login
                </Link>
                <Link href={signup_path()} className="btn btn-primary btn-sm no-underline">
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
                href={about_path()}
                className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={about_team_path()}
                className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Team
              </Link>
              <Link
                href={about_technology_path()}
                className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Technology
              </Link>
              {auth.user && (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={logout_path()}
                    method="delete"
                    as="button"
                    className="block w-full text-left px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </>
              )}
              {!auth.user && (
                <>
                  <Link
                    href={login_path()}
                    className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href={signup_path()}
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
