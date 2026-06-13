import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

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
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar user={user} title={title} />
      <main className="flex-1 py-8 md:py-12">
        {fullWidth ? children : <div className="container-app">{children}</div>}
      </main>
      <Footer />
    </div>
  )
}
