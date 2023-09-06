'use client'
import { getLink } from '@/lib/getLink'

type Props = {
  slug: string
}

const RedirectPage: React.FC<Props> = ({ slug }: Props) => {
  const redirect = (slug: string) => {
    getLink(slug)
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
