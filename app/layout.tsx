import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import MouseGlow from '@/components/MouseGlow'
import Preloader from '@/components/Preloader'

const inter = localFont({
  src: '../public/assets/fonts/inter-variable.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

const syne = localFont({
  src: '../public/assets/fonts/syne-variable.woff2',
  variable: '--font-syne',
  display: 'swap',
  weight: '400 800',
})

export const metadata: Metadata = {
  title: 'Selim Usenmez — BTS SIO SLAM',
  description: 'Portfolio de Selim Usenmez, étudiant BTS SIO SLAM à Lyon. Développement web, IA, Docker.',
  keywords: ['portfolio', 'BTS SIO SLAM', 'développeur', 'Lyon', 'Selim Usenmez', 'web', 'IA'],
  authors: [{ name: 'Selim Usenmez' }],
  openGraph: {
    title: 'Selim Usenmez — BTS SIO SLAM',
    description: 'Portfolio de Selim Usenmez, étudiant BTS SIO SLAM à Lyon. Développement web, IA, Docker.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${syne.variable}`}>
      <body>
        <Preloader />
        <CustomCursor />
        <MouseGlow />
        {children}
      </body>
    </html>
  )
}
