import type { Metadata } from 'next'
import Link from 'next/link'
import { ASSETS } from '@/lib/assets'

export const metadata: Metadata = {
  title: { absolute: '404 Seite nicht gefunden | Rai-experte.ch' },
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center text-white"
      style={{
        backgroundImage: `url(${ASSETS.heroSmall})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-black/20" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets_marco/images/ui/404.svg" alt="" className="relative mb-6 w-40 max-w-[60%]" />
      <h1 className="heading-hero relative !text-white">404</h1>
      <p className="relative mt-4 text-xl font-light">Oops, Seite nicht gefunden!</p>
      <Link href="/" className="btn btn-hero relative mt-8">
        Zurück zur Webseite!
      </Link>
    </section>
  )
}
