import RedirectPage from '@/components/RedirectPage'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'
import Script from 'next/script'

type Props = {
  params: { slug: string }
}

export default async function page ({ params }: Props) {
  const { slug } = params

  const SlugExist = await prisma.shortUrl.findFirst({
    where: {
      slug
    }
  })

  if (!SlugExist) {
    return notFound()
  }

  return (
    <main className='min-w-5xl min-h-[80vh]'>
      <div className='w-full h-full flex items-center justify-center '>
        <RedirectPage slug={slug} />
      </div>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6632073480694542'
        crossOrigin='anonymous'
      />
    </main>
  )
}
