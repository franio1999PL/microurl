import { NextResponse as res } from 'next/server'
import { revalidatePath } from 'next/cache'

import { geolocation } from '@vercel/edge';
import prisma from '@/lib/db';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const { city, country } = geolocation(req);
    const apiKey = searchParams.get('apiKey')
    const slug = searchParams.get('slug')

    if (slug === null) {
        return res.json({
            error: {
                message: 'Slug jest wymagany!'
            }
        })
    }

    const link = await prisma.shortUrl
        .findFirst({
            where: {
                slug
            }
        })
        .finally(() => prisma.$disconnect())

    if (link !== null) {
        const addAnalytics = await prisma.shortUrl.update({
            where: {
                slug
            },
            data: {
                clicks: link?.clicks + 1
            }
        }).finally(() => {
            revalidatePath('/dashboard/links')
            prisma.$disconnect()
        })

        const addGeolocation = await prisma.linkClicks.create({
            data: {
                linkId: link.id,
                country: country,
                city: city
            }
        }).finally(() => {
            // add revalidate path
            prisma.$disconnect()
        })

        console.log(addGeolocation)

        return res.json({
            longUrl: link.longUrl,
        })
    }

    if (link === null) {
        return res.json({
            error: {
                message: 'Nie ma takiego linku!'
            }
        })
    }

    // return res.json({ city: city, country, countryRegion, region })
}