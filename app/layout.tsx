import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
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
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
