import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Stripe from 'stripe'

import prisma from './db'
import { randomUUID } from 'crypto'


// price_1NmhW2IKLwmbNhSs1WW8P7yU

export const stripe = new Stripe(String(process.env.STRIPE_SECRECT), {
    apiVersion: '2023-08-16'
})

export async function hasSubscription() {
    const session = await getServerSession(authOptions)

    if (session) {
        const user = await prisma.user.findFirst({ where: { email: session.user?.email } }).finally(() => prisma.$disconnect())

        const subscription = await stripe.subscriptions.list({
            customer: String(user?.stripe_customer_id)
        })

        return subscription.data.length > 0
    }
    return false
}

export async function createCheckoutLink(customer: string) {
    const checkout = await stripe.checkout.sessions.create({
        success_url: `${process.env.MAIN_URL}/dashboard/billing?success=true`,
        cancel_url: `${process.env.MAIN_URL}/dashboard/billing?success=true`,
        customer: customer,
        line_items: [
            {
                price: "price_1NmhW2IKLwmbNhSs1WW8P7yU"
            }
        ],
        mode: "subscription"
    })

    return checkout.url
}

export async function createCustomerIfNull() {
    const session = await getServerSession(authOptions)

    if (session) {
        const user = await prisma.user.findFirst({ where: { email: session.user?.email } }).finally(() => prisma.$disconnect())

        if (!user?.api_key) {
            await prisma.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    api_key: "secret_" + randomUUID()
                }
            }).finally(() => prisma.$disconnect())
        }

        if (!user?.stripe_customer_id) {
            const customer = await stripe.customers.create({
                email: String(user?.email)
            })

            await prisma.user.update({
                where: {
                    id: user?.id
                },
                data: {
                    stripe_customer_id: customer.id,
                    api_key: "secret_" + randomUUID()
                }
            }).finally(() => prisma.$disconnect())
        }

        const user2 = await prisma.user.findFirst({ where: { email: session.user?.email } }).finally(() => prisma.$disconnect())
        return user2?.stripe_customer_id
    }

}