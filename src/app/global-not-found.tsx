/**
 * Globale 404-Seite (Next `globalNotFound`) — greift für komplett unbekannte
 * URLs ausserhalb der Route-Groups. Da es keinen gemeinsamen Root-Layout gibt
 * (je ein eigenes <html> unter (frontend)/(payload)), rendert diese Seite ihr
 * eigenes vollständiges HTML-Dokument.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { montserrat } from '@/app/fonts'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: '404 Seite nicht gefunden | Rai-experte.ch',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="de-CH" className={montserrat.variable}>
      <body className="bg-white text-ink antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center bg-surface-blue px-6 py-24 text-center">
          <span className="footer-heading">Fehler 404</span>

          <p className="mt-6 text-[120px] font-bold leading-none text-petrol sm:text-[160px]">
            404
          </p>

          <h1 className="heading-sub mt-2 !text-ink">Seite nicht gefunden</h1>

          <p className="mt-4 max-w-md text-[17px] font-normal leading-relaxed text-body">
            Die gewünschte Seite existiert nicht oder wurde verschoben. Kehren Sie
            zurück zur Startseite, um weiterzustöbern.
          </p>

          <Link href="/" className="btn btn-fill mt-10">
            Zurück zur Startseite
          </Link>
        </main>
      </body>
    </html>
  )
}
