import prisma from '@/lib/db'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import ChartAnalytics from '@/components/ChartAnalytics'
import Header from '@/components/header'
import Footer from '@/components/Footer'

type Props = {
  params: { slug: string }
}

export default async function page ({ params }: Props) {
  const { slug } = params

  const session = await getServerSession(authOptions)

  const checkSlugExist = await prisma.shortUrl
    .findFirst({
      where: {
        slug
      },
      select: {
        userId: true,
        id: true
      }
    })
    .finally(() => prisma.$disconnect())

  if (!checkSlugExist) {
    return notFound()
  }

  const getUser = await prisma.user
    .findFirst({
      where: {
        email: session?.user?.email
      },
      select: {
        id: true
      }
    })
    .finally(() => prisma.$disconnect())

  if (checkSlugExist.userId !== getUser?.id) {
    return notFound()
  }
  const links = await prisma.linkClicks
    .findMany({
      where: {
        linkId: checkSlugExist.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    .finally(() => prisma.$disconnect())
  if (checkSlugExist.id !== links[0].linkId) {
    return notFound()
  }

  //   console.log(links)

  return (
    <>
      <Header />
      <div className='text-black'>
        <div>
          <ChartAnalytics links={links} />
        </div>
        {links.length > 0 ? (
          <Table>
            <TableCaption>Lista 10 najnowszych zdarzeń.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>#</TableHead>
                <TableHead className='text-center'>Kraj</TableHead>
                <TableHead className='text-center'>Miasto</TableHead>
                <TableHead className='text-center'>Data wejścia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.length > 0 ? (
                links.slice(0, 10).map((link, index) => (
                  <TableRow key={link.id}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell className='text-center'>
                      <ReactCountryFlag
                        countryCode={String(link.country)}
                        svg
                        cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
                        cdnSuffix='svg'
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                        title={String(link.country)}
                        className='rounded-sm border border-slate-50 bg-slate-50'
                      />
                    </TableCell>
                    <TableCell className='text-center'>{link.city}</TableCell>
                    <TableCell className='text-center'>
                      <span className='px-2 py-1 rounded-full bg-black w-full text-slate-50'>
                        {link.createdAt.toLocaleString('pl-PL', {
                          timeZone: 'Europe/Warsaw'
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <>
                  <div className='w-full text-center'>
                    <h1 className='font-medium text-center text-red-500'>
                      Brak Danych
                    </h1>
                    <h1 className='font-medium text-center text-red-500'>
                      Brak Danych
                    </h1>
                    <h1 className='font-medium text-center text-red-500'>
                      Brak Danych
                    </h1>
                    <h1 className='font-medium text-center text-red-500'>
                      Brak Danych
                    </h1>
                  </div>
                </>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='font-bold text-center text-red-500 uppercase'>
              Brak Danych
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
