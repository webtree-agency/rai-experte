/**
 * Payload v3 Konfiguration — BURGMEIJER RAI-Experte.
 *
 * Erforderliche Env-Vars (siehe .env.example):
 *   PAYLOAD_SECRET, DATABASE_URI
 *
 * Rein deutschsprachige Site (lang="de-CH") → keine Content-Lokalisierung.
 * Media-Uploads gehen nach Cloudflare R2 (S3-kompatibel), sofern die S3-Env-
 * Vars gesetzt sind — sonst lokaler Fallback (public/uploads).
 */
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Angebote } from './collections/Angebote'
import { Referenzen } from './collections/Referenzen'
import { Veranstaltungen } from './collections/Veranstaltungen'
import { Anmeldungen } from './collections/Anmeldungen'
import { Kontaktanfragen } from './collections/Kontaktanfragen'

import { Preise } from './globals/Preise'
import { Kontakt } from './globals/Kontakt'
import { Rechtstexte } from './globals/Rechtstexte'
import { UeberMich } from './globals/UeberMich'
import { SeoDefaults } from './globals/SeoDefaults'

// Sharp ist optional — lokal ohne native Binary darf nichts crashen.
let sharp: unknown = undefined
try {
  sharp = (await import('sharp')).default
} catch {
  // ohne Sharp: Payload-Media-Resizing aus, alles andere unverändert.
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasS3 = Boolean(
  process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_ENDPOINT,
)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    theme: 'light',
    meta: {
      title: 'RAI-Experte · Admin',
      titleSuffix: '',
    },
    /**
     * Live Preview — der Redaktor sieht die laufende Seite live im Admin-Iframe
     * (mit Mobile/Tablet/Desktop-Umschalter). Bewusst OHNE Drafts: jede Änderung
     * speichert direkt produktiv, RefreshRouteOnSave triggert `router.refresh()`
     * im Frontend (siehe src/components/preview/LivePreviewListener.tsx).
     *
     * Die url-Funktion mappt jede Collection/Global auf die Seite, wo ihr Inhalt
     * erscheint: Angebote → /<slug>, Rechtstexte → /impressum, alles andere
     * (Referenzen, Veranstaltungen, Preise, Über-mich, Kontakt, SEO) → Startseite.
     */
    livePreview: {
      url: ({ data, collectionConfig, globalConfig }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
        if (collectionConfig?.slug === 'angebote' && data?.slug) return `${base}/${data.slug}`
        if (globalConfig?.slug === 'rechtstexte') return `${base}/impressum`
        return base
      },
      collections: ['referenzen', 'angebote', 'veranstaltungen'],
      globals: ['preise', 'rechtstexte', 'kontakt', 'uebermich', 'seoDefaults'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sharp: sharp as any,
  collections: [
    Users,
    Media,
    Angebote,
    Referenzen,
    Veranstaltungen,
    Anmeldungen,
    Kontaktanfragen,
  ],
  globals: [Preise, Kontakt, Rechtstexte, UeberMich, SeoDefaults],
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ?? 'postgres://payload:payload@localhost:5432/rai_experte',
    },
    // push:true für lokale Dev-Quick-Iteration. Production via `payload migrate`.
    push: true,
  }),
  // Secret nur zur Server-Runtime hart erzwingen (build-tolerant für CLI-Steps).
  secret: (() => {
    if (process.env.PAYLOAD_SECRET) return process.env.PAYLOAD_SECRET
    if (process.env.NEXT_PHASE === 'phase-production-server') {
      throw new Error('PAYLOAD_SECRET muss zur Server-Runtime in Production gesetzt sein.')
    }
    return 'BUILD_TIME_PLACEHOLDER_NEVER_USED_AT_RUNTIME'
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'payload-schema.graphql'),
  },
  plugins: [
    // R2 / S3 Media-Storage — Shared-Bucket (webtree-media) mit Prefix `rai-experte`.
    // Ohne S3-Env-Vars schaltet das Plugin sich aus → Payload bleibt lokal.
    ...(hasS3
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: process.env.S3_PREFIX ?? 'rai-experte',
                ...(process.env.S3_PUBLIC_URL
                  ? {
                      generateFileURL: ({ filename, prefix }) => {
                        const base = process.env.S3_PUBLIC_URL!.replace(/\/$/, '')
                        return prefix ? `${base}/${prefix}/${filename}` : `${base}/${filename}`
                      },
                    }
                  : {}),
              },
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION ?? 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
  // Globales Upload-Limit (aktuell nur Media-Collection nutzt `upload`).
  upload: {
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  },
})
