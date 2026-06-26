'use client'

/**
 * Scroll-to-Top — fixed unten rechts, erscheint nach 100px Scroll. Hover-Swap
 * weiss↔petrol (Pfeil zeigt nach oben), Klick scrollt sanft nach oben.
 */
import { useEffect, useState } from 'react'
import { HoverArrow } from '@/components/ui/HoverArrow'
import { ASSETS } from '@/lib/assets'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Nach oben scrollen"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group fixed bottom-[4%] right-[3%] z-40 cursor-pointer"
    >
      <HoverArrow base={ASSETS.arrowTopWhite} hover={ASSETS.arrowTopPetrol} size={48} />
    </button>
  )
}
