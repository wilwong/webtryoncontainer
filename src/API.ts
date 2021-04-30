
export async function cmsGet(brand: string, path: string) {
    try {    
        const url = new URL(`https://apic.looc.io/${brand}/${path}`)

        console.log("Fetching ", url.toString(), " from CMS API")

        const response = await fetch(url.href, {
            method: 'GET',
        })

        if (response.ok) {
            let json = await response.json()
            return json
        } else {
            let text = await response.text()
            console.log(`Failed to load ${path} due to ${text}`)
        }
    } catch (error) {
        console.error(error)
    }
}