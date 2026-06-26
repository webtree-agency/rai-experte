/**
 * SEO-Defaults (Global) — Marken-/Hero-Texte, Default-OG-Bild, Site-Name und
 * Google-Site-Verification. Quelle für Header/Hero/Footer-Brand und Metadata-Fallbacks.
 */
import type { GlobalConfig } from 'payload'

export const SeoDefaults: GlobalConfig = {
  slug: 'seoDefaults',
  label: 'SEO & Marke',
  admin: {
    group: 'Inhalt',
    description: 'Marken-/Hero-Texte, Standard-OG-Bild und Site-weite SEO-Defaults.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      defaultValue: 'BURGMEIJER RAI-Experte',
      admin: { description: 'Marken-Titel (Header, Hero, Footer). Erstes Wort wird fett dargestellt.' },
    },
    { name: 'siteName', type: 'text', defaultValue: 'Rai-experte.ch', admin: { description: 'og:site_name.' } },
    {
      name: 'heroSubtitel',
      type: 'text',
      defaultValue: 'Optimale Tarifstufen mit minimalem Dokumentationsaufwand',
      admin: { description: 'Untertitel im Hero (h3).' },
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      admin: { description: 'Fallback-Meta-Description für die Startseite.' },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Standard-Social-Sharing-Bild (Fallback, 1200×630).' },
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      defaultValue: '7rD4xKAmDRZU1KuMYKzSwWw9Z56MsKYF6ACq9FpxJus',
      admin: { description: 'Inhalt des google-site-verification Meta-Tags.' },
    },
  ],
}
