import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: '404 Seite nicht gefunden | Rai-experte.ch' },
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    // data-light-header → schaltet den globalen Header per CSS auf dunkle
    // Schrift (heller Hintergrund, sonst unlesbar). Siehe globals.css.
    <section
      data-light-header
      className="flex min-h-[80vh] flex-col items-center justify-center bg-surface-blue px-6 pt-32 pb-24 text-center"
    >
      <span className="footer-heading">Fehler 404</span>

      <p className="mt-6 text-[120px] font-bold leading-none text-petrol sm:text-[160px]">404</p>

      <h1 className="heading-sub mt-2 !text-ink">Seite nicht gefunden</h1>

      <p className="mt-4 max-w-md text-[17px] font-normal leading-relaxed text-body">
        Die gewünschte Seite existiert nicht oder wurde verschoben. Kehren Sie zurück zur
        Startseite, um weiterzustöbern.
      </p>

      <Link href="/" className="btn btn-fill mt-10">
        Zurück zur Startseite
      </Link>
    </section>
  )
}
