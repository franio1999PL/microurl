'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

export default function Avatar ({
  imageUrl,
  accountName
}: {
  imageUrl: string
  accountName: string
}) {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <>
      <Image
        src={imageUrl}
        alt={`Zdjęcie profilowe użytkownika ${accountName}`}
        width={64}
        height={64}
        className='rounded-full border border-slate-200 cursor-pointer select-none '
        onClick={() => setOpenMenu(!openMenu)}
      />
      <>
        {openMenu ? (
          <>
            <div className='flex flex-col gap-4 bg-slate-50 bg-opacity-70 border px-4 py-8  rounded-md my-4 fixed top-20 right-[22.5%] shadow-md'>
              <Link
                href={'/dashboard/links'}
                className='font-medium text-sm text-slate-700 border bg-slate-200 rounded-md px-4 py-2 hover:opacity-80'
                onClick={() => setOpenMenu(false)}
              >
                Moje Skrócone Url
              </Link>
              <Link
                href={'/dashboard/links/create'}
                className='font-medium text-sm text-white text-center bg-emerald-500 px-4 py-2 rounded-md transition-opacity duration-75 hover:opacity-80'
                onClick={() => setOpenMenu(false)}
              >
                Stwórz Url
              </Link>
              <Link
                href={'/dashboard'}
                className='font-medium text-sm text-white text-center bg-black px-4 py-2 rounded-lg hover:opacity-80'
                onClick={() => setOpenMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                href={'/api/auth/signout'}
                className='font-medium text-sm text-white text-center bg-red-500 px-4 py-2 rounded-lg hover:opacity-80'
                onClick={() => setOpenMenu(false)}
              >
                Wyloguj
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
      {/* <Toaster position='bottom-center' reverseOrder={false} /> */}
    </>
  )
}
