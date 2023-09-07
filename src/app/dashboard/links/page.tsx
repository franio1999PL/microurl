import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import prisma from '@/lib/db'

import RemoveButton from '@/components/RemoveButton'
import CopyUrl from '@/components/CopyUrl'
import Header from '@/components/header'
import Footer from '@/components/Footer'

export default async function page () {
  const session = await getServerSession(authOptions)

  const user = await prisma.user
    .findFirst({
      where: {
        email: String(session?.user?.email)
      }
    })
    .finally(() => prisma.$disconnect())

  const userId = user?.id

  const links = await prisma.shortUrl
    .findMany({
      where: {
        userId: String(userId)
      },
      orderBy: {
        clicks: 'desc'
      }
    })
    .finally(() => prisma.$disconnect())

  return (
    <>
      <Header />
      <main className='flex flex-col items-center w-full'>
        <h1 className='px-4 py-8 text-2xl '>Twoje skrócone linki URL</h1>
        <div className='w-full'>
          {links.length > 0 ? (
            <Table>
              <TableCaption>Lista twoich skróconych URL.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>#</TableHead>
                  <TableHead className='text-center'>Długie Url</TableHead>
                  <TableHead className='text-center'>Skrócone Url</TableHead>
                  <TableHead className='text-center'>Ilość Wejść</TableHead>
                  <TableHead className='text-right'>#</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.length > 0 ? (
                  links.map((link, index) => (
                    <TableRow key={link.id}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>
                      <TableCell>
                        <CopyUrl long={true} url={link.longUrl} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <CopyUrl url={`${process.env.MAIN_URL}/${link.slug}`} />
                      </TableCell>
                      <TableCell className='text-center'>
                        <Link
                          href={`${process.env.MAIN_URL}/dashboard/links/analytics/${link.slug}`}
                          className='px-2 py-1 rounded-full bg-black w-full text-slate-50'
                        >
                          {link.clicks}
                        </Link>
                      </TableCell>
                      <TableCell className='text-right'>
                        <RemoveButton linkId={link.id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <div className='w-full text-center'>
                      <h1 className='font-medium text-center text-red-500'>
                        Brak Skróconych Url
                      </h1>
                      <h1 className='font-medium text-center text-red-500'>
                        Brak Skróconych Url
                      </h1>
                      <h1 className='font-medium text-center text-red-500'>
                        Brak Skróconych Url
                      </h1>
                      <h1 className='font-medium text-center text-red-500'>
                        Brak Skróconych Url
                      </h1>
                    </div>
                  </>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className='flex flex-col items-center justify-center gap-4'>
              <h1 className='font-bold text-center text-red-500 uppercase'>
                Brak linków
              </h1>
              <Link
                href={'/dashboard/links/create'}
                className='px-4 py-2 bg-emerald-500 text-white rounded-md hover:opacity-80'
              >
                Dodaj nowy skrócony url
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
