// create short url
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { getServerSession } from 'next-auth'
import { customAlphabet } from 'nanoid'
// import { toast } from 'react-hot-toast'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import Header from '@/components/header'
import Footer from '@/components/Footer'

export default async function page () {
  const session = await getServerSession(authOptions)

  const handleSubmit = async (fromData: FormData) => {
    'use server'

    const longUrl = fromData.get('url')

    if (longUrl === '') {
      // toast.error('Url nie może być puste!')
      console.log('Url nie możę być pusty!')
      return
    }

    const user = await prisma.user
      .findFirst({
        where: {
          email: String(session?.user?.email)
        }
      })
      .finally(() => prisma.$disconnect())

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const getHash = customAlphabet(characters, 8)

    const hash = getHash()

    const createUrl = await prisma.shortUrl
      .create({
        data: {
          longUrl: String(longUrl),
          slug: String(hash),
          userId: String(user?.id)
        }
      })
      .catch(error => {
        // toast.error('Wystąpił błąd spróbuj ponownie!')
        console.log('Błąd nie udało się dodać url!')
        console.error(error)
      })
      .finally(() => {
        prisma.$disconnect()
        redirect('/dashboard/links')
        // toast.success('Pomyślnie dodano url!')
      })
  }

  return (
    <>
      <Header />
      <main className='max-w-5xl min-h-[90vh] flex flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl uppercase'>Skróć URL</h1>
        <div className='w-full'>
          <form
            action={handleSubmit}
            className='flex flex-col items-center w-full gap-3'
          >
            <label className='w-1/3 text-center px-4 py-6'>Wpisz URL:</label>
            <input
              type='url'
              name='url'
              className='border px-4 py-2 bg-slate-50 w-1/3 font-mono'
              placeholder='https://example.com'
              aria-hidden
            />
            <button
              type='submit'
              className='bg-emerald-400 px-4 py-2 rounded-md transition-opacity duration-75 hover:opacity-80'
            >
              Stwórz
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
