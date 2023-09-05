import Image from 'next/image'

export default function page () {
  return (
    <div>
      <Image src='/og-image-sm.png' height={600} width={800} alt='' />
      <Image src='/og-image-lg.png' height={1600} width={1800} alt='' />
    </div>
  )
}
