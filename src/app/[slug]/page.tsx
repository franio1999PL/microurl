'use client'
import { useGetLink } from '@/lib/useGetLink'
import Script from 'next/script'

type Props = {
  params: { slug: string }
}

export default function page ({ params }: Props) {
  const { slug } = params

  return (
    <main className='min-w-5xl min-h-[80vh]'>
      <div className='w-full items-center justify-center '>
        <button
          className='bg-black rounded-md py-2 px-4'
          onClick={() => useGetLink(slug)}
        >
          Przejdź do strony
        </button>
      </div>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6632073480694542'
        crossOrigin='anonymous'
      />
    </main>
  )
}
