'use client'
import { useGetLink } from '@/lib/useGetLink'
import Script from 'next/script'

type Props = {
  params: { slug: string }
}

export default function page ({ params }: Props) {
  const { slug } = params

  return (
    <main className='min-w-5xl '>
      <button onClick={() => useGetLink(slug)}>Redirect</button>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6632073480694542'
        crossOrigin='anonymous'
      />
    </main>
  )
}
