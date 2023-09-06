'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
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

      <div className=' bg-slate-50 border rounded-md border-slate-100 max-w-[1024px] w-full py-4 my-12 shadow-md'>
        <ResponsiveContainer width='100%' height={530}>
          <BarChart data={dataXD}>
            <XAxis
              dataKey='date'
              stroke='#000000'
              fontSize={12}
              tickLine={true}
              axisLine={true}
              reversed
            />
            <YAxis
              stroke='#000000'
              fontSize={12}
              tickLine={true}
              axisLine={true}
              tickFormatter={value => `👆 ${value}`}
            />
            <Bar dataKey='Ilość Wejść' fill='#8884d8' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
