import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import prisma from '@/lib/db'

type Props = {
  params: { slug: string }
}

export default async function page ({ params }: Props) {
  const { slug } = params

  const link = await prisma.shortUrl
    .findFirst({
      where: {
        slug
      }
    })
    .finally(() => prisma.$disconnect())

  if (link !== null) {
    const addAnalytics = await prisma.shortUrl.update({
      where: {
        slug
      },
      data: {
        clicks: link?.clicks + 1
      }
    })
    revalidatePath('/dashboard/links')
    prisma.$disconnect()
    redirect(link.longUrl)
  }

  const city = await fetch(`${process.env.MAIN_URL}/api/endpoint`, {
    method: 'GET'
  }).then(res => res.json())

  return (
    <div>
      <div>My Post: {params.slug}</div>
      <div>City: {city ? JSON.parse(city) : ''}</div>
    </div>
  )
}
