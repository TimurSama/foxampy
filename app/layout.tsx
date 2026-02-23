import type { Metadata, Viewport } from 'next'
import GlobalBackground from '@/components/backgrounds/GlobalBackground'
import './globals.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'foxampy web',
  description: 'Innovative creator - system design, interdisciplinary approach, architecture of environment',
  keywords: ['portfolio', 'foxampy', 'creator', 'system design', 'innovation'],
  authors: [{ name: 'foxampy' }],
  openGraph: {
    title: 'foxampy web',
    description: 'Innovative creator - system design and interdisciplinary solutions',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#030303',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="version" content="1.0.0" />
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self'; connect-src 'self' https://vercel.live; frame-src 'self' https://vercel.live;"
        />
      </head>
      <body className="antialiased">
        <I18nProvider>
          {/* Clean Oil Flow Background */}
          <GlobalBackground />
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
