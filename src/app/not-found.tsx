'use client'
import Link from 'next/link'
import { GridLoader } from 'react-spinners'

export default function loading () {
  return (
    <div className='min-w-full w-full min-h-screen flex flex-col justify-center items-center '>
      <div>
        <GridLoader color='#000000' />
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <h1 className='text-center text-4xl text-black font-semibold px-16 pt-16 pb-4'>
          Błąd 404!
        </h1>
        <p className='text-center text-2xl text-black font-semibold p-4'>
          Podana strona nie istnieje!
        </p>
        <Link
          className='text-black underline text-center text-lg p-8'
          href={'/'}
        >
          Wróć do strony głównej
        </Link>
      </div>
    </div>
  )
}
