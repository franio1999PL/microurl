'use client'

import { useEffect } from 'react'

type Props = {
  params: { slug: string }
}

export default function page ({ params }: Props) {
  const { slug } = params

  const red = async () => {
    await fetch(`http://localhost:3000/api/endpoint?slug=${slug}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        window.location.href = String(res.longUrl)
      })
      .catch(err => console.log(err))
    // .finally(() => (window.location.pathname = String(longUrl)))
  }

  useEffect(() => {
    const time = setTimeout(async () => {
      await red()
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
