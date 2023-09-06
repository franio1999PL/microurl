'use client'
import { useGetLink } from '@/lib/useGetLink'

type Props = {
  slug: string
}

export default function RedirectPage ({ slug }: Props) {
  return (
    <button
      className='bg-black rounded-md text-white py-2 px-4'
      onClick={() => useGetLink(slug)}
    >
      Przejdź do strony
    </button>
  )
}
