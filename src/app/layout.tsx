import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ogImageSm from '@/images/og-image-sm.png'
import ogImageLg from '@/images/ig-image-lg.png'
import Image from 'next/image'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'Skracanie Linków | MICROURL.PL',
  description:
    'Możliwość, analizowania ruchu na twoich social mediach oraz tworzenie skróconych url.',
  openGraph: {
    title: 'Skracanie Linków | MICROURL.PL',
    description:
      'Możliwość, analizowania ruchu na twoich social mediach oraz tworzenie skróconych url.',
    url: String(process.env.MAIN_URL),
    siteName: 'MICROURL',
    images: [
      {
        url: 'https://microurl.pl/_next/image?url=%2Fog-image-sm.png&w=828&q=75',
        width: 800,
        height: 600,
        alt: 'Small OG image'
      },
      {
        url: 'https://microurl.pl/_next/image?url=%2Fog-image-lg.png&w=1920&q=75',
        width: 1800,
        height: 1600,
        alt: 'Large OG image'
      }
    ],
    locale: 'pl_PL',
    type: 'website'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='pl'>
      <body className={poppins.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
