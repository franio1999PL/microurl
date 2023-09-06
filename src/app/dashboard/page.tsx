import {
  createCheckoutLink,
  createCustomerIfNull,
  hasSubscription
} from '@/lib/stripe'
import getServerSession from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/lib/db'

export default async function page () {
  const session = await getServerSession(authOptions)
  const customer = await createCustomerIfNull()

  const hasSub = await hasSubscription()
  const checkoutLink = await createCheckoutLink(String(customer))

  const user = await prisma.user
    .findFirst({
      where: {
        email: session?.user?.email
      }
    })
    .finally(() => prisma.$disconnect())

  return (
    <main>
      {hasSub ? (
        <>
          <div className='flex flex-col gap-4'>
            <div className='rounded-md px-4 py-2 bg-emerald-400 font-medium text-black text-sm'>
              Masz Subskrybcje!
            </div>
            <div className='divide-y divide-zinc-200 border border-zinc-200 rounded-md'>
              <p className='text-sm text-black px-6 py-4'>API Key</p>
              <p className='font-sm font-mono font-medium text-zinc-800 px-6 py-4'>
                {user?.api_key}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='min-h-[60vh] grid place-items-center rounded-lg px-6 py-10 bg-slate-100'>
            <Link
              href={String(checkoutLink)}
              className='font-medium text-base hover:underline'
            >
              Nie masz wykupionej subskrypcji, zakup teraz!
            </Link>
          </div>
        </>
      )}
    </main>
  )
}
