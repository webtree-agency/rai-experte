/**
 * Footer — Logo/Marke + Webtree-Credit, Kontaktinfos, Rechtslinks, LinkedIn,
 * Copyright. Daten aus dem Kontakt-Global. Heller blauer Hintergrund.
 */
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react'
import { SiteTitle } from '@/components/ui/SiteTitle'
import { LINKS } from '@/lib/assets'
import type { Angebote, Kontakt } from '@/payload-types'

type Props = { siteTitle: string; kontakt: Kontakt | null; angebote?: Angebote[] }

export function Footer({ siteTitle, kontakt, angebote = [] }: Props) {
  const email = kontakt?.email ?? 'rai-experte@gmx.ch'
  const telefon = kontakt?.telefon ?? '+41 76 457 44 82'
  const adresse = `${kontakt?.strasse ?? 'Sunnmatt 1'}, ${kontakt?.plzOrt ?? '8634 Hombrechtikon'}`
  const linkedin = kontakt?.linkedin ?? 'https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/'

  const jahr = new Date().getFullYear()

  return (
    <footer className="bg-surface-blue">
      <div className="site-container grid grid-cols-1 gap-x-10 gap-y-12 pt-16 pb-16 sm:grid-cols-2 lg:grid-cols-12 lg:pt-20 lg:pb-20">
        {/* Marke + Credit */}
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-4">
          <Link href="/" className="text-2xl text-ink">
            <SiteTitle title={siteTitle} />
          </Link>
          <p className="max-w-[34ch] text-[15px] font-normal leading-relaxed text-body">
            Beratung &amp; Schulung für eine einfache, krankenkassentaugliche Pflegedokumentation.
          </p>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-petrol hover:bg-petrol hover:text-white"
          >
            <Linkedin size={18} />
          </a>
        </div>

        {/* Angebote */}
        <nav className="flex flex-col gap-4 lg:col-span-3">
          <h3 className="footer-heading">Angebote</h3>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            {angebote.map((a) => (
              <li key={a.id}>
                <Link href={`/${a.slug}`} className="footer-link">
                  {a.titel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontaktinfos */}
        <div className="flex flex-col gap-4 lg:col-span-3">
          <h3 className="footer-heading">Kontakt</h3>
          <ul className="flex flex-col gap-3 text-[15px] text-body">
            <li className="flex items-center gap-3">
              <Mail size={17} className="shrink-0 text-petrol" />
              <a href={`mailto:${email}`} className="footer-link">
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={17} className="shrink-0 text-petrol" />
              <a href={`tel:${telefon.replace(/\s/g, '')}`} className="footer-link">
                {telefon}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-petrol" />
              <span className="font-normal">{adresse}</span>
            </li>
          </ul>
        </div>

        {/* Rechtslinks */}
        <nav className="flex flex-col gap-4 lg:col-span-2">
          <h3 className="footer-heading">Rechtliches</h3>
          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <Link href="/agb" className="footer-link">
                AGB
              </Link>
            </li>
            <li>
              <Link href="/impressum" className="footer-link">
                Impressum
              </Link>
            </li>
            <li>
              <Link href="/datenschutz" className="footer-link">
                Datenschutz
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Copyright-Leiste */}
      <div className="border-t border-ink/10">
        <div className="site-container flex flex-col items-center justify-between gap-2 py-5 text-[13px] text-muted sm:flex-row">
          <p>© {jahr} BURGMEIJER RAI-Experte. Alle Rechte vorbehalten.</p>
          <a
            href={LINKS.webtree}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-petrol"
          >
            Realisiert von <span className="font-medium text-ink">Webtree GmbH</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
