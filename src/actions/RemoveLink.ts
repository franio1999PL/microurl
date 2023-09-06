'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'

export const handleRemove = async (linkId: any) => {
    const removeLink = await prisma.shortUrl
        .delete({
            where: {
                id: linkId
            }
        })
        .catch((error: any) => console.error(error))
        .finally(() => {
            prisma.$disconnect()
            revalidatePath('/dashboard/links')
        })
}