import { NextResponse as res } from 'next/server'


import { geolocation } from '@vercel/edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const { city, country, countryRegion, region } = geolocation(req);
    const apiKey = searchParams.get('apiKey')

    return res.json({ city: city, country, countryRegion, region })
}