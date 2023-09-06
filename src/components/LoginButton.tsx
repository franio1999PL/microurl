'use client'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export default function LoginButton () {
  return (
    <Button
      onClick={() =>
        signIn('discord', { redirect: true, callbackUrl: '/dashboard' })
      }
    >
      Zaloguj
    </Button>
  )
}
