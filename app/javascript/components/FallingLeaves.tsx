import React, { useMemo } from 'react'

export default function FallingLeaves() {
  const leaves = useMemo(() => {
    const arr: any[] = []
    for (let i = 0; i < 16; i++) {
      const left = Math.random() * 100
      const fallDuration = 6 + Math.random() * 10 // seconds
      const delay = Math.random() * -12
      const size = 18 + Math.random() * 36
      const opacity = 0.6 + Math.random() * 0.4
      const sway = 12 + Math.random() * 36 // horizontal amplitude px
      const rotateDir = Math.random() > 0.5 ? 1 : -1
      const rotateSpeed = 180 + Math.random() * 360 // degrees over fall
      arr.push({ left, fallDuration, delay, size, opacity, sway, rotateDir, rotateSpeed })
    }
    return arr
  }, [])

  // generate per-leaf keyframes to allow different amplitudes, rotations and timings
  const perLeafStyles = leaves
    .map((l, idx) => {
      const amp = Math.round(l.sway)
      const rot = Math.round(l.rotateDir * l.rotateSpeed)
      const topStart = -12
      const y30 = Math.round((l.fallDuration * 0.3) * 10) // not used directly, but kept for readability
      return `@keyframes vf-move-${idx} {
        0% { transform: translate(${0}px, ${topStart}vh) rotate(0deg); opacity: ${l.opacity}; }
        30% { transform: translate(${amp}px, ${Math.round(8)}vh) rotate(${Math.round(rot * 0.25)}deg); opacity: ${Math.min(1, l.opacity + 0.1)}; }
        60% { transform: translate(${-Math.round(amp * 0.6)}px, ${Math.round(60)}vh) rotate(${Math.round(rot * 0.6)}deg); opacity: ${Math.max(0.7, l.opacity - 0.05)}; }
        100% { transform: translate(${Math.round(amp * 0.2)}px, ${Math.round(120)}vh) rotate(${rot}deg); opacity: ${Math.max(0.6, l.opacity - 0.1)}; }
      }`
    })
    .join('\n')

  const baseStyles = `
    .vf-leaf { position: absolute; top: -12vh; will-change: transform, opacity; pointer-events: none; display: block; }
    .vf-crop { position: absolute; width: 140px; opacity: 0.9; transform-origin: center; }
    .vf-crop svg { width: 100%; height: auto; display: block; }
    .vf-crop-left { left: 8px; bottom: 8%; transform: translateY(0); }
    .vf-crop-right { right: 8px; top: 8%; transform: translateY(0); }
    @keyframes vf-float { 0% { transform: translateY(0); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0); } }
    .vf-crop { animation: vf-float 6s ease-in-out infinite; }
    @media (max-width: 640px) { .vf-crop { display: none; } }
  `

  return (
    <div className="pointer-events-none" style={{ position: 'absolute', inset: 0 }}>
      <style>{baseStyles + '\n' + perLeafStyles}</style>

      {/* decorative crops */}
      <div className="vf-crop vf-crop-left" aria-hidden>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="#68A84B">
            <path d="M32 2c-1 8-8 12-8 12s6 2 8 8c2-6 8-8 8-8s-7-4-8-12z" />
            <path d="M20 20c-1 6-6 8-6 8s5 1 6 6c1-5 6-6 6-6s-5-2-6-8z" />
            <path d="M44 18c-1 5-5 7-5 7s4 1 5 5c1-4 5-5 5-5s-4-2-5-7z" />
            <path d="M24 32c-1 6-7 9-7 9s6 1 7 6c1-5 7-6 7-6s-6-3-7-9z" />
            <path d="M40 34c-1 6-6 9-6 9s5 1 6 6c1-5 6-6 6-6s-5-3-6-9z" />
          </g>
        </svg>
      </div>

      <div className="vf-crop vf-crop-right" aria-hidden>
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <g fill="#7BC47F">
            <path d="M32 2c-1 8-8 12-8 12s6 2 8 8c2-6 8-8 8-8s-7-4-8-12z" />
            <path d="M20 20c-1 6-6 8-6 8s5 1 6 6c1-5 6-6 6-6s-5-2-6-8z" />
            <path d="M44 18c-1 5-5 7-5 7s4 1 5 5c1-4 5-5 5-5s-4-2-5-7z" />
            <path d="M24 32c-1 6-7 9-7 9s6 1 7 6c1-5 7-6 7-6s-6-3-7-9z" />
            <path d="M40 34c-1 6-6 9-6 9s5 1 6 6c1-5 6-6 6-6s-5-3-6-9z" />
          </g>
        </svg>
      </div>

      {leaves.map((l, idx) => (
        <span
          key={idx}
          className="vf-leaf"
          style={{
            left: `${l.left}%`,
            width: `${l.size}px`,
            height: `${l.size}px`,
            opacity: l.opacity,
            transform: `translateY(0) rotate(0deg)`,
            animation: `vf-move-${idx} ${l.fallDuration}s cubic-bezier(0.2,0.8,0.2,1) ${l.delay}s infinite`,
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 24 24" width={l.size} height={l.size} aria-hidden>
            <path d="M21.6 3.2c-2.6.6-5.1 2.6-7.6 5.1-2.5 2.5-4.4 4.9-5 7.4-1.1 4.7 3.1 9 7.9 8 2.6-.6 5.1-2.6 7.6-5.1 2.5-2.5 4.4-4.9 5-7.4.9-4.7-3.4-9-8.9-8zm-2 10.4c-1.8 1.8-4.3 3-6.4 3.6 1.9-1.9 3.1-4.4 3.6-6.4 1.5.5 2.9 1.5 2.8 2.8z" fill="#F97316" />
          </svg>
        </span>
      ))}
    </div>
  )
}
