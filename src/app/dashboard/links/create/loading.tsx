'use client'
import { GridLoader } from 'react-spinners'

export default function loading () {
  return (
    <div className='min-w-full w-full min-h-screen flex justify-center items-center '>
      <div>
        <GridLoader color='#000000' />
      </div>
    </div>
  )
}
