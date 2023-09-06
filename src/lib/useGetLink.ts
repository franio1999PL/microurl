"use client"


export const useGetLink = async (slug: string) => {
    await fetch(`https://microurl.pl/api/endpoint?slug=${slug}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            window.location.href = String(res.longUrl)
        })
        .catch(err => console.log(err))
    // .finally(() => (window.location.pathname = String(longUrl)))
}

