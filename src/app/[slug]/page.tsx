'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  params: { slug: string }
}

export default function page ({ params }: Props) {
  const [longUrl, setLongUrl] = useState('')
  const router = useRouter()

  const { slug } = params

  const redirect = (url: string) => {
    router.push
  }

  const test = async () => {
    await fetch(`http://localhost:3000/api/endpoint?slug=${slug}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        setLongUrl(res.longUrl)
        window.location.href = String(res.longUrl)
      })
      .catch(err => console.log(err))
    // .finally(() => (window.location.pathname = String(longUrl)))
  }

  useEffect(() => {
    const time = setTimeout(async () => {
      await test()
      console.log('chuj')

      console.log('first')
      redirect(longUrl)
    }, 1)

    return clearTimeout('time')
  }, [])

  return (
    <div>
      <div>My Post: {params.slug}</div>
      <div>{longUrl}</div>
      {/* <div>City: {res ? res.city : ''}</div>
      <div>Country: {res ? res.country : ''}</div>
      <div>Country Region: {res ? res.countryRegion : ''}</div>
      <div>region: {res ? res.region : ''}</div> */}
    </div>
  )
}
