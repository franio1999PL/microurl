'use client'
import { getLink } from '@/lib/getLink'
import { useRouter } from 'next/navigation'

type Props = {
  slug: string
}

const RedirectPage: React.FC<Props> = ({ slug }: Props) => {
  const router = useRouter()

  const redirect = async (slug: string) => {
    const link = await getLink(slug)

    // @ts-ignore
    router.push(String(link.longUrl))
    console.log(link)
    // router.push(String(link))
  }

  setTimeout(() => {
    redirect(slug)
  }, 1000)

  return (
    <button
      className='bg-black rounded-md text-white py-2 px-4'
      onClick={() => redirect(slug)}
    >
      Za chwile zostaniesz przekierowany
    </button>
  )
}

export default RedirectPage
