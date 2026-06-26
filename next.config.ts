import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  experimental: {
    reactCompiler: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'rai-experte.ch' },
      { protocol: 'https', hostname: 'www.rai-experte.ch' },
      // R2-CDN — Payload-Media wird via media.webtree.ch ausgeliefert.
      { protocol: 'https', hostname: 'media.webtree.ch' },
    ],
  },
  /**
   * 301-Redirects der alten `.html`-URLs auf die neuen Slug-Routen. Die alte
   * sitemap.xml und externe Backlinks zeigen auf die `.html`-Pfade — ohne diese
   * Weiterleitungen gäbe es SEO-Verlust + 404s. Die `/erfolg`-Seite existiert
   * nicht mehr (Inline-Erfolg) → auf die Startseite umleiten.
   */
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/tarifstufen.html', destination: '/tarifstufen', permanent: true },
      { source: '/heiminterne.html', destination: '/heiminterne', permanent: true },
      { source: '/beratung.html', destination: '/beratung', permanent: true },
      { source: '/wechselbesarai.html', destination: '/wechselbesarai', permanent: true },
      { source: '/agb.html', destination: '/agb', permanent: true },
      { source: '/impressum.html', destination: '/impressum', permanent: true },
      { source: '/datenschutz.html', destination: '/datenschutz', permanent: true },
      { source: '/erfolg.html', destination: '/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
