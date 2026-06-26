/**
 * Footer — Logo/Marke + Webtree-Credit, Kontaktinfos, Rechtslinks, LinkedIn,
 * Copyright. Daten aus dem Kontakt-Global. Heller blauer Hintergrund.
 */
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { SiteTitle } from '@/components/ui/SiteTitle'
import { LINKS } from '@/lib/assets'
import type { Kontakt } from '@/payload-types'

type Props = { siteTitle: string; kontakt: Kontakt | null }

export function Footer({ siteTitle, kontakt }: Props) {
  const email = kontakt?.email ?? 'rai-experte@gmx.ch'
  const telefon = kontakt?.telefon ?? '+41 76 457 44 82'
  const adresse = `${kontakt?.strasse ?? 'Sunnmatt 1'}, ${kontakt?.plzOrt ?? '8634 Hombrechtikon'}`
  const linkedin = kontakt?.linkedin ?? 'https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/'

  return (
    <footer className="bg-surface-blue pt-[55px] md:pt-[95px]">
      <div className="site-container grid grid-cols-1 gap-10 pb-[50px] sm:grid-cols-2 md:grid-cols-3 md:pb-[120px] lg:pb-[170px]">
        {/* Marke + Credit */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl text-ink">
            <SiteTitle title={siteTitle} />
          </Link>
          <a
            href={LINKS.webtree}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base text-ink transition-colors hover:text-petrol"
          >
            Made with ❤️ by <span className="font-bold">Webtree</span>
          </a>
        </div>

        {/* Kontaktinfos */}
        <ul className="flex flex-col gap-3 text-muted">
          <li className="flex items-center gap-3">
            <Mail size={18} className="shrink-0" />
            <a href={`mailto:${email}`} className="font-light transition-colors hover:text-petrol">
              {email}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={18} className="shrink-0" />
            <a href={`tel:${telefon.replace(/\s/g, '')}`} className="font-light transition-colors hover:text-petrol">
              {telefon}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <MapPin size={18} className="shrink-0" />
            <span className="font-light">{adresse}</span>
          </li>
        </ul>

        {/* Rechtslinks */}
        <ul className="flex flex-col gap-3 text-muted">
          <li>
            <Link href="/agb" className="font-light transition-colors hover:text-petrol">
              AGB
            </Link>
          </li>
          <li>
            <Link href="/impressum" className="font-light transition-colors hover:text-petrol">
              Impressum
            </Link>
          </li>
          <li>
            <Link href="/datenschutz" className="font-light transition-colors hover:text-petrol">
              Datenschutz
            </Link>
          </li>
        </ul>
      </div>

      {/* Copyright-Leiste */}
      <div className="border-t border-ink/5 py-[15px]">
        <div className="site-container flex items-center justify-between">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-petrol text-white transition-opacity hover:opacity-80"
          >
            <Linkedin size={16} />
          </a>
          <div className="text-right text-[9px] font-normal uppercase tracking-wide text-ink">
            <p>© BURGMEIJER RAI-Experte</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
