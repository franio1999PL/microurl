import { NextResponse as res } from 'next/server'


import { geolocation } from '@vercel/edge';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const { city } = geolocation(req);
    const apiKey = searchParams.get('apiKey')

    return res.json({ city: city })
}