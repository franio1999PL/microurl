'use client'
import { useGetLink } from '@/lib/useGetLink'

type Props = {
  slug: string
}

const RedirectPage: React.FC<Props> = ({ slug }: Props) => {
  const redirect = (slug: string) => {
    useGetLink(slug)
  }
  return (
    <button
      className='bg-black rounded-md text-white py-2 px-4'
      onClick={() => redirect(slug)}
    >
      Przejdź do strony
    </button>
  )
}

export default RedirectPage
