import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type Props = {
  params: { slug: string }
}

export default async function page ({ params }: Props) {
  const { slug } = params

  const link = await prisma.shortUrl.findFirst({
    where: {
      slug
    }
  })

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
    redirect(link.longUrl)
  }

  return <div>My Post: {params.slug}</div>
}
