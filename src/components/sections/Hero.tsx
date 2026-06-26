/**
 * Hero — vollflächiges Verlaufsbild (Desktop/Mobile via .hero-bg), Marken-H1,
 * Untertitel (h3) und Scroll-Pfeil zum Intro (#main).
 */
import Link from 'next/link'
import { HoverArrow } from '@/components/ui/HoverArrow'
import { Reveal } from '@/components/ui/Reveal'
import { ASSETS } from '@/lib/assets'

type Props = { title: string; subtitle: string }

export function Hero({ title, subtitle }: Props) {
  const [first, ...rest] = title.split(' ')
  return (
    <section id="hero" className="hero-bg relative flex min-h-screen flex-col">
      <div className="site-container flex flex-1 flex-col items-center justify-center pt-20 text-center">
        <Reveal>
          <h1 className="heading-hero">
            <span className="brand-bold">{first}</span>
            {rest.length > 0 && <> {rest.join(' ')}</>}
          </h1>
          <h3 className="mt-4 text-[24px] font-light text-white">{subtitle}</h3>
        </Reveal>
      </div>
      <div className="flex justify-center pb-[5vh]">
        <Link href="/#main" aria-label="Nach unten scrollen" className="group">
          <HoverArrow base={ASSETS.arrowWhite} hover={ASSETS.arrowWhitePetrol} rotate={180} size={60} />
        </Link>
      </div>
    </section>
  )
}
