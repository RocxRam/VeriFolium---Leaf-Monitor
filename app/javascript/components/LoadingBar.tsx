import React, { useEffect, useRef, useState } from 'react'

export default function LoadingBar() {
  const [visible, setVisible] = useState(false)
  const [percent, setPercent] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const handleStart = () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
      setVisible(true)
      setPercent(0)
      // gently advance to 60-75% while loading
      timerRef.current = window.setInterval(() => {
        setPercent((p) => Math.min(75, p + Math.random() * 8))
      }, 400)
    }

    const handleProgress = (e: any) => {
      if (e && e.detail && typeof e.detail.progress === 'number') {
        setPercent(Math.round(e.detail.progress * 100))
      }
    }

    const handleFinish = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      setPercent(100)
      setTimeout(() => {
        setVisible(false)
        setPercent(0)
      }, 400)
    }

    document.addEventListener('inertia:start', handleStart)
    document.addEventListener('inertia:progress', handleProgress)
    document.addEventListener('inertia:finish', handleFinish)

    return () => {
      document.removeEventListener('inertia:start', handleStart)
      document.removeEventListener('inertia:progress', handleProgress)
      document.removeEventListener('inertia:finish', handleFinish)
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  if (!visible) return null

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 6, zIndex: 60 }} aria-hidden>
      <div className="bg-slate-200/90 h-full w-full backdrop-blur-sm overflow-hidden rounded-b-xl shadow-sm">
        <div
          className="bg-gradient-to-r from-primary-500 via-emerald-400 to-secondary-500 h-full relative overflow-hidden"
          style={{ width: `${percent}%`, transition: 'width 300ms linear' }}
        >
          <div
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)' }}
            className="pointer-events-none"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.6 3.2c-2.6.6-5.1 2.6-7.6 5.1-2.5 2.5-4.4 4.9-5 7.4-1.1 4.7 3.1 9 7.9 8 2.6-.6 5.1-2.6 7.6-5.1 2.5-2.5 4.4-4.9 5-7.4.9-4.7-3.4-9-8.9-8zm-2 10.4c-1.8 1.8-4.3 3-6.4 3.6 1.9-1.9 3.1-4.4 3.6-6.4 1.5.5 2.9 1.5 2.8 2.8z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
