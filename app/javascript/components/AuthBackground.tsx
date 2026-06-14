import React from 'react'

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        .auth-bg__leaf { position: absolute; opacity: 0.18; will-change: transform; transform-origin: center; filter: drop-shadow(0 20px 40px rgba(15,23,42,0.08)); }
        .auth-bg__leaf-left { left: -16px; top: 6%; width: 280px; animation: auth-lean-left 10s ease-in-out infinite alternate; }
        .auth-bg__leaf-right { right: -16px; bottom: 5%; width: 320px; animation: auth-lean-right 11s ease-in-out infinite alternate; }
        .auth-bg__leaf-center { left: 50%; top: 22%; width: 260px; transform: translateX(-50%); opacity: 0.12; animation: auth-lean-center 12s ease-in-out infinite alternate; }
        .auth-bg__leaf path { fill: #3f8b28; }
        .auth-bg__spot { position: absolute; border-radius: 9999px; background: rgba(34,197,94,0.18); filter: blur(36px); }
        .auth-bg__spot-1 { width: 220px; height: 220px; left: -64px; top: 12%; }
        .auth-bg__spot-2 { width: 260px; height: 260px; right: -72px; bottom: 8%; }
        @keyframes auth-lean-left { 0% { transform: translateX(-12px) rotate(-8deg); } 100% { transform: translateX(10px) rotate(4deg); } }
        @keyframes auth-lean-right { 0% { transform: translateX(12px) rotate(8deg); } 100% { transform: translateX(-10px) rotate(-4deg); } }
        @keyframes auth-lean-center { 0% { transform: translateX(-50%) translateY(0px) rotate(-6deg); } 100% { transform: translateX(-50%) translateY(12px) rotate(6deg); } }
        @media (max-width: 768px) { .auth-bg__leaf, .auth-bg__spot { display: none; } }
      `}</style>

      <div className="auth-bg__spot auth-bg__spot-1" aria-hidden />
      <div className="auth-bg__spot auth-bg__spot-2" aria-hidden />

      <svg className="auth-bg__leaf auth-bg__leaf-left" viewBox="0 0 220 400" aria-hidden>
        <path d="M38.3 18.2c9.1 8.2 14.8 18.5 16.2 30.8 2.6 22.5-8.9 42.6-24.8 55.8-13 10.6-29.8 16.9-44.1 24.8 4.3 3.2 8.6 6.3 12.9 9.4 16 11.6 30.4 25.1 40.8 42.2 8.9 14.8 14.6 31.4 17.9 48.6 0.1 0.6 0.2 1.2 0.4 1.7 9.2 18.4 12.5 39.8 10.7 60.1-1.8 19.9-7.8 39.4-17.8 57.3 11.2 1.2 22.5 0.8 33.7-0.9 26.9-4.1 52.6-14.1 74.5-29.4 14.7-10.4 26.6-23.4 34.9-38.9 9.5-17.2 14.2-36.5 13.1-55.6-1.4-24.6-11.7-47.3-26.7-66.7-15.7-20.5-35.7-36.1-57.8-47.4-17.9-9-36.7-15.8-55.4-21.7-1.8-0.6-3.7-1.2-5.6-1.8-7.5-2.2-15.0-4.2-22.6-6.1-2.7-0.7-5.5-1.4-8.2-2.1z" />
      </svg>

      <svg className="auth-bg__leaf auth-bg__leaf-right" viewBox="0 0 260 420" aria-hidden>
        <path d="M192.9 21.7c-11.5 9.3-20.1 20.9-25.9 34.4-7.7 17.8-8.9 37.5-4.1 55.4 3.1 10.5 7.8 20.4 12.3 30.2 7 14.2 13.1 28.7 17.4 43.8 4.2 14.5 7.3 29.3 8.9 44.3 1.2 11.0 1.1 22.1-0.5 33-2.4 17.3-7.7 34.1-16.0 49.7-1.5 2.9-3.1 5.8-4.7 8.6-2.9 5.2-6.0 10.4-9.5 15.1-19.7 27.1-54.0 47.4-86.7 55.9-20.5 5.2-41.5 6.4-62.4 3.7-16.0-2.1-31.7-6.6-46.2-13.4 10.0-17.7 18.6-35.9 24.1-55.4 5.7-20.4 8.5-41.4 8.2-62.3-0.2-10.1-0.9-20.2-2.0-30.2-1.2-11.3-3.4-22.4-6.8-33.3-5.3-16.8-13.4-32.9-24.5-46.9 18.8-8.0 38.4-12.6 58.7-13.7 15.4-0.8 30.8 1.3 45.4 5.9 15.9 5.0 31.1 12.8 44.8 23.4 6.0 4.6 11.7 9.6 16.9 15.2 2.3 2.3 4.7 4.6 6.9 7.0z" />
      </svg>

      <svg className="auth-bg__leaf auth-bg__leaf-center" viewBox="0 0 220 400" aria-hidden>
        <path d="M55.5 20.9c12.6 11.4 20.1 25.8 22.0 43.1 2.4 21.7-4.8 42.9-17.3 59.3-10.6 13.4-24.7 22.6-38.2 33.5 4.7 3.8 9.6 7.6 14.3 11.4 14.5 11.2 26.9 23.7 35.7 39.9 8.4 15.2 12.8 32.2 13.9 49.4.2 1.0.4 1.9.5 2.9 4.6 24.8-1.6 51.1-15.5 73.8-3.4 5.4-7.1 10.6-11.2 15.4-22.2 26.8-57.3 41.4-90.2 37.1-15.6-2.0-30.5-7.6-43.6-16.5 18.2-0.8 36.4-5.1 53.3-12.8 17.6-8.2 33.8-19.5 47.4-33.2 26.3-26.5 41.7-61.1 42.1-97.4.3-21.1-3.5-42.1-10.5-62.2-7.4-21.1-18.7-41.0-32.7-58.6-8.1-11.1-17.4-21.4-27.9-30.3z" />
      </svg>
    </div>
  )
}
