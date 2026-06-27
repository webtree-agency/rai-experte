'use client'

/**
 * Header / Navigation — transparent über dem Hero, weisse Schrift. Desktop:
 * horizontale Links. Mobile (≤860px): Hamburger → Vollbild-Overlay (weiss) mit
 * gestaffelt einfadenden Links (--i steuert transition-delay, siehe globals.css).
 */
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Mail, Phone, Linkedin } from 'lucide-react'
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

type Props = { siteTitle: string; linkedin: string; email: string; telefon: string }

export function Header({ siteTitle, linkedin, email, telefon }: Props) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="site-container flex items-center justify-between gap-3 py-6 md:py-8">
        <Link
          href="/"
          onClick={close}
          className="min-w-0 shrink truncate text-lg text-white sm:text-xl md:text-2xl"
        >
          <SiteTitle title={siteTitle} className="max-w-full truncate align-bottom" />
        </Link>

        {/* Desktop-Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[18px] font-medium uppercase text-white/90 transition-colors hover:text-white"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
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
          'fixed inset-0 z-40 flex flex-col justify-center gap-8 bg-white px-[10%] transition-opacity duration-300 lg:hidden',
          open
            ? 'mobile-nav-open pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
      >
        {/* Navigation */}
        <nav className="flex flex-col items-start">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={{ '--i': i } as React.CSSProperties}
              className="mobile-nav-link group relative block py-2.5 text-3xl font-semibold uppercase text-ink"
            >
              <span className="absolute -left-[10%] top-1/2 h-[2px] w-7 -translate-y-1/2 scale-x-0 rounded-full bg-petrol transition-transform duration-300 ease-out group-hover:scale-x-100" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Kontakt */}
        <div
          style={{ '--i': NAV.length } as React.CSSProperties}
          className="mobile-nav-link flex flex-col gap-4 border-t border-ink/10 pt-8"
        >
          <span className="footer-heading">Kontakt</span>
          <a
            href={`tel:${telefon.replace(/\s/g, '')}`}
            onClick={close}
            className="flex items-center gap-3 text-lg font-normal text-body transition-colors hover:text-petrol"
          >
            <Phone size={18} className="shrink-0 text-petrol" />
            {telefon}
          </a>
          <a
            href={`mailto:${email}`}
            onClick={close}
            className="flex items-center gap-3 text-lg font-normal text-body transition-colors hover:text-petrol"
          >
            <Mail size={18} className="shrink-0 text-petrol" />
            {email}
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center gap-3 text-lg font-normal text-body transition-colors hover:text-petrol"
          >
            <Linkedin size={18} className="shrink-0 text-petrol" />
            LinkedIn
          </a>
        </div>
      </div>
    </header>
  )
}
