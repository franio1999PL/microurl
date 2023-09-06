'use client'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'
import { BsDiscord } from 'react-icons/bs'

export default function LoginDiscordButton () {
  return (
    <Button
      className='bg-[#7289da] text-slate-50'
      onClick={() =>
        signIn('discord', { redirect: true, callbackUrl: '/dashboard' })
      }
    >
      <span className='px-2'>Zaloguj za pomocą</span> <BsDiscord size={24} />
    </Button>
  )
}
