'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

type Props = {
  links: {
    id: string
    linkId: string
    createdAt: Date
    country: string | null
    city: string | null
  }[]
}

type Links = {
  id: string
  linkId: string
  createdAt: Date
  country: string | null
  city: string | null
}

export default function ChartAnalytics ({ links }: Props) {
  //   console.log(links)

  const data: Links[] = [
    {
      id: '1583cd3c-0688-4656-8ede-6e808449a181',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-06T22:48:12.985Z'),
      country: 'PL',
      city: 'Rzeszów'
    },
    {
      id: '1cb2a8f3-c7d1-46ab-850c-e8bcb1aca0fb',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-04T23:13:58.229Z'),
      country: 'PL',
      city: 'Rzeszów'
    },
    {
      id: '3f1e921d-76c2-427b-b662-63a763466bab',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-05T23:14:06.769Z'),
      country: 'PL',
      city: 'Rzeszów'
    },
    {
      id: '45b32157-6575-46cd-ba48-2d131ac1afea',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-06T23:13:54.875Z'),
      country: 'PL',
      city: 'Rzeszów'
    },
    {
      id: '77217f21-6ddc-4053-937e-4f534fd35d20',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-05T23:14:03.359Z'),
      country: 'PL',
      city: 'Rzeszów'
    },
    {
      id: 'b63b334d-a9cc-4485-9b95-ff4a093be6a6',
      linkId: '67d8e483-c832-4ca0-b3e8-65f2bede3a91',
      createdAt: new Date('2023-09-06T22:34:51.821Z'),
      country: 'PL',
      city: 'Rzeszów'
    }
  ]

  // Przetwórz dane na format z datą i liczbą danych
  const processData = (data: Links[]) => {
    const groupedData: any = {}

    data.forEach(item => {
      const date = item.createdAt.toISOString().split('T')[0] // Pobierz datę
      groupedData[date] = (groupedData[date] || 0) + 1 // Zwiększ liczbę danych w danej grupie czasowej
    })

    return Object.keys(groupedData).map(date => ({
      date,
      'Ilość Wejść': groupedData[date]
    }))
  }

  const dataXD = processData(links)
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <h2 className='text-xl p-4 text-center uppercase font-semibold'>
        Wykres
      </h2>
      <div className='p-12'>
        <LineChart
          width={840}
          height={520}
          className='w-full min-h-5xl'
          data={dataXD}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='Ilość Wejść' stroke='#8884d8' />
        </LineChart>
      </div>
    </div>
  )
}
