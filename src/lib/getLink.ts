"use client"



export const getLink = async (slug: string) => {
    try {
        const res = await fetch(`https://microurl.pl/api/endpoint?slug=${slug}`, {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        throw err; // Przekaż błąd dalej, aby można było go obsłużyć na wyższym poziomie
    }
}

