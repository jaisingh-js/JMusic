export async function getSongById(id) {
    try {
        const response = await fetch(`https://saavn.dev/api/songs/${id}`);
        if(!response.ok) {
            throw new Error("Could not fetch song.");
        }

        const data = response.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }
}