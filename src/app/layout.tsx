import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'

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
      <Script src='https://www.googletagmanager.com/gtag/js?id=G-LFPK4SN5D3' />
      <Script id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-LFPK4SN5D3');
        `}
      </Script>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
