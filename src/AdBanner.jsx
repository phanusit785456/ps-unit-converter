import { useEffect, useRef } from 'react'

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT
const IS_PROD = import.meta.env.PROD

export default function AdBanner({ slot, style, className = '' }) {
  const pushed = useRef(false)

  useEffect(() => {
    if (!IS_PROD || !CLIENT || pushed.current) return
    pushed.current = true
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch { /* already initialized */ }
  }, [])

  // In dev mode always show placeholder — AdSense JS interferes with layout in localhost
  if (!CLIENT || !IS_PROD) {
    return (
      <div className={`ad-placeholder ${className}`} style={style}>
        <span>Advertisement</span>
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}
