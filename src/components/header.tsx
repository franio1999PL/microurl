import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'

import LoginModal from './LoginModal'
import AvatarWithModal from './AvatarWithModal'

export default async function Header () {
  const session = await getServerSession(authOptions)
  return (
    <nav className='max-w-5xl m-auto px-4'>
      <div className='flex items-center gap-8 justify-between py-4'>
        <Link
          href={'/'}
          className='text-2xl font-semibold text-black hover:opacity-80'
        >
          MICROURL
        </Link>
        <div className='flex items-center gap-4'>
          <Link
            href={'/#cena'}
            className='font-medium text-sm text-black hover:opacity-80'
          >
            Cena
          </Link>
          <Link
            href={'/#funkcje'}
            className='font-medium text-sm text-black hover:opacity-80'
          >
            Funkcje Aplikacji
          </Link>

          {session ? (
            <AvatarWithModal
              imageUrl={String(session.user?.image)}
              accountName={String(session?.user?.name)}
            />
          ) : (
            <LoginModal />
          )}
        </div>
      </div>
    </nav>
  )
}
