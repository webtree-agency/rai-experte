/**
 * Frontend-Root-Layout — rendert <html lang="de-CH">/<body>, hängt die
 * Montserrat-Variable an, lädt Header/Footer-Daten aus dem CMS und bindet
 * ScrollToTop + JSON-LD ein.
 *
 * Das Payload-Admin hat sein EIGENES Root-Layout unter (payload)/layout.tsx —
 * bewusst entkoppelt.
 */
import type { Metadata } from 'next'
import { montserrat } from '@/app/fonts'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { ScrollToTop } from '@/components/site/ScrollToTop'
import { JsonLd } from '@/components/seo/JsonLd'
import { getKontakt, getSeoDefaults } from '@/lib/cms'
import { localBusinessSchema } from '@/lib/jsonld'
import { SITE_URL, SITE_NAME, OG_DEFAULT } from '@/lib/site'
import { ASSETS } from '@/lib/assets'
import '@/app/globals.css'

// CMS-getrieben → pro Request rendern (Header/Footer/Inhalte aus Payload).
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoDefaults()
  const verification = seo?.googleSiteVerification ?? undefined
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand | Rai-experte.ch',
      template: '%s',
    },
    description: seo?.defaultMetaDescription ?? undefined,
    applicationName: SITE_NAME,
    icons: { icon: ASSETS.favicon },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url: SITE_URL,
      images: [{ url: OG_DEFAULT, width: 1200, height: 630, alt: 'BURGMEIJER RAI-Experte' }],
    },
    ...(verification ? { verification: { google: verification } } : {}),
    robots: { index: true, follow: true },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const [seo, kontakt] = await Promise.all([getSeoDefaults(), getKontakt()])
  const siteTitle = seo?.siteTitle ?? 'BURGMEIJER RAI-Experte'
  const linkedin = kontakt?.linkedin ?? 'https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/'

  return (
    <html lang="de-CH" className={montserrat.variable}>
      <body className="bg-white text-ink antialiased">
        <JsonLd data={localBusinessSchema(kontakt)} />
        <Header siteTitle={siteTitle} linkedin={linkedin} />
        <main>{children}</main>
        <Footer siteTitle={siteTitle} kontakt={kontakt} />
        <ScrollToTop />
      </body>
    </html>
  )
}
