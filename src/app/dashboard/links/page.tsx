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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { PrismaClient } from '@prisma/client'

import RemoveButton from '@/components/RemoveButton'
import CopyUrl from '@/components/CopyUrl'
const prisma = new PrismaClient()

export default async function page () {
  const session = await getServerSession(authOptions)

  const user = await prisma.user.findFirst({
    where: {
      email: String(session?.user?.email)
    }
  })

  const userId = user?.id

  const links = await prisma.shortUrl.findMany({
    where: {
      userId: String(userId)
    }
  })

  return (
    <main className='flex flex-col items-center w-full'>
      <h1 className='px-4 py-8 text-2xl '>Twoje skrócone linki URL</h1>
      <div className='w-full'>
        {links.length > 0 ? (
          <Table>
            <TableCaption>Lista twoich skróconych URL.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>#</TableHead>
                <TableHead>Długie Url</TableHead>
                <TableHead>Skrócone Url</TableHead>
                <TableHead>Ilość Wejść</TableHead>
                <TableHead className='text-right'>#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.length > 0 ? (
                links.map((link, index) => (
                  <TableRow key={link.id}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>
                    <TableCell>
                      <CopyUrl url={link.longUrl} />
                    </TableCell>
                    <TableCell>
                      <CopyUrl url={`${process.env.MAIN_URL}/${link.slug}`} />
                    </TableCell>
                    <TableCell>{link.clicks}</TableCell>
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
  )
}
