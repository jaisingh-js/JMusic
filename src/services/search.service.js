export async function searchSong(name) {
    try {
        const res = await fetch(`https://saavn.dev/api/search/songs?query=${name}`)
        if(!res.ok) {
            throw new Error("Some problem occured during search");
        }

        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("Fetch error: ", error);
        throw error;
    }

}