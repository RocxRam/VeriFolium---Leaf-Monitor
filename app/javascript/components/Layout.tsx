import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FallingLeaves from './FallingLeaves'
import LoadingBar from './LoadingBar'
import GoogleTranslateWidget from './GoogleTranslateWidget'

interface LayoutProps {
  children: React.ReactNode
  user?: { name: string; email: string } | null
  title?: string
  fullWidth?: boolean
}

export default function Layout({
  children,
  user,
  title = 'VeriFolium',
  fullWidth = false,
}: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-100 text-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-200/30 blur-3xl opacity-90" />
        <div className="absolute bottom-16 right-6 h-80 w-80 rounded-full bg-secondary-200/25 blur-3xl opacity-90" />
        <div className="absolute top-1/3 left-12 h-40 w-40 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-24 h-44 w-44 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>
      <LoadingBar />
      <FallingLeaves />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar title={title} />
        <main className="flex-1 py-10 md:py-14">
          {fullWidth ? children : <div className="container-app">{children}</div>}
        </main>
      </div>
    </div>
  )
}
