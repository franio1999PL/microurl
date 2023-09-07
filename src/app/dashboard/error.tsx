'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error ({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='min-w-full w-full min-h-screen flex justify-center items-center'>
      <h2 className='text-center p-8 text-2xl'>Nastąpił nieoczekiwany błąd</h2>
      <button
        className='px-4 py-2 bg-black text-white hover:opacity-80'
        onClick={() => reset()}
      >
        Spróbuj ponownie
      </button>
    </div>
  )
}
