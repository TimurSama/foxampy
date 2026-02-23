import type { Metadata, Viewport } from 'next'
import GlobalBackground from '@/components/backgrounds/GlobalBackground'
import './globals.css'
import { I18nProvider } from '@/lib/i18n/context'

export const metadata: Metadata = {
  title: 'Foxampy Lab | Portfolio Gallery',
  description: 'Portfolio gallery of Foxampy Lab - multidisciplinary solutions in IT, design, architecture, and cinema',
  keywords: ['portfolio', 'gallery', 'design', 'architecture', 'IT', 'Foxampy'],
  authors: [{ name: 'Foxampy Lab' }],
  openGraph: {
    title: 'Foxampy Lab | Portfolio Gallery',
    description: 'Multidisciplinary solutions laboratory portfolio',
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
