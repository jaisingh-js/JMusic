const BASE_URL = "https://saavn.dev/api";

export async function searchSong(name) {
  try {
    const res = await fetch(`${BASE_URL}/search/songs?query=${name}&limit=200`);
    if (!res.ok) {
      throw new Error("Some problem occured during search");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
}

export async function getSongById(id) {
  try {
    const response = await fetch(`${BASE_URL}/songs/${id}`);
    if (!response.ok) {
      throw new Error("Could not fetch song.");
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
}
