import Footer from '@/components/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

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
