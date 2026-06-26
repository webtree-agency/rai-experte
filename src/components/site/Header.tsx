'use client'

/**
 * Header / Navigation — transparent über dem Hero, weisse Schrift. Desktop:
 * horizontale Links. Mobile (≤860px): Hamburger → Vollbild-Overlay (weiss) mit
 * gestaffelt einfadenden Links (--i steuert transition-delay, siehe globals.css).
 */
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SiteTitle } from '@/components/ui/SiteTitle'
import { ASSETS } from '@/lib/assets'
import { cn } from '@/lib/utils'

type NavItem = { label: string; href: string; external?: boolean }

const NAV: NavItem[] = [
  { label: 'Start', href: '/' },
  { label: 'Angebote', href: '/#angebot' },
  { label: 'Über mich', href: '/#ubermich' },
  { label: 'Kontakt', href: '/#kontakt' },
]

type Props = { siteTitle: string; linkedin: string }

export function Header({ siteTitle, linkedin }: Props) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="site-container flex items-center justify-between py-6 md:py-8">
        <Link href="/" onClick={close} className="text-xl text-white md:text-2xl">
          <SiteTitle title={siteTitle} />
        </Link>

        {/* Desktop-Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-semibold uppercase text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ASSETS.linkedinIcon} alt="LinkedIn" className="h-6 w-6" />
          </a>
        </nav>

        {/* Mobile-Hamburger */}
        <button
          type="button"
          aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 text-white lg:hidden"
        >
          {open ? <X size={34} className="text-ink" /> : <Menu size={34} />}
        </button>
      </div>

      {/* Mobile-Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col items-start justify-center gap-2 bg-white px-[10%] transition-opacity duration-300 lg:hidden',
          open
            ? 'mobile-nav-open pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        {NAV.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            style={{ '--i': i } as React.CSSProperties}
            className="mobile-nav-link block py-3 text-3xl font-semibold uppercase text-ink"
          >
            {item.label}
          </Link>
        ))}
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          style={{ '--i': NAV.length } as React.CSSProperties}
          className="mobile-nav-link mt-2 flex items-center gap-2 py-3 text-3xl font-semibold uppercase text-ink"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ASSETS.linkedinIcon} alt="" className="h-7 w-7" />
          LinkedIn
        </a>
      </div>
    </header>
  )
}
