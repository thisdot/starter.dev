import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch}) => {
    const endpoint = "https://api.starter.dev/hello?greeting=This Dot Labs!";
    let loading = true;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
    console.log(await response.json());

    // const message: string = await response.json();
    const message = "Hey"
    loading = false;

    return {
        message,
        loading
    }
}