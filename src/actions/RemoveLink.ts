'use server'

import { revalidatePath } from 'next/cache'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const handleRemove = async (linkId: any) => {
    const removeLink = await prisma.shortUrl
        .delete({
            where: {
                id: linkId
            }
        })
        .catch((error: any) => console.error(error))
        .finally(() => {
            revalidatePath('/dashboard/links')
        })
}