'use client'
import { useGetLink } from '@/lib/useGetLink'

type Props = {
  params: { slug: string }
}

export default function page ({ params }: Props) {
  const { slug } = params

  console.log('test')

  return (
    <div>
      <div>My Post: {params.slug}</div>
      <button onClick={() => useGetLink(slug)}>Redirect</button>
      {/* <div>{longUrl}</div> */}
      {/* <div>City: {res ? res.city : ''}</div>
      <div>Country: {res ? res.country : ''}</div>
      <div>Country Region: {res ? res.countryRegion : ''}</div>
      <div>region: {res ? res.region : ''}</div> */}
    </div>
  )
}
