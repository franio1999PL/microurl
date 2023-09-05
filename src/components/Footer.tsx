import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='max-w-5xl m-auto px-4 pb-8 mt-40 select-none'>
      <h1 className='text-xl font-semibold text-center uppercase'>
        <Link
          href={'/'}
          className='hover:opacity-80 hover:underline transition-all duration-100'
        >
          Microurl.pl
        </Link>{' '}
        &copy; 2023
      </h1>
    </footer>
  )
}
