"use client"
import { useEffect } from "react"


export const getLink = (slug: string) => {


    const red = async () => {
        await fetch(`http://localhost:3000/api/endpoint?slug=${slug}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                window.location.href = String(res.longUrl)
            })
            .catch(err => console.log(err))
        // .finally(() => (window.location.pathname = String(longUrl)))
    }

    useEffect(() => {
        const time = setTimeout(async () => {
            await red()
        }, 1)

        return clearTimeout('time')
    }, [])
}