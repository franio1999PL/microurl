import { NextResponse as res } from 'next/server'



export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const apiKey = searchParams.get('apiKey')

    return res.json({ works: apiKey })
}