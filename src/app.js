import { searchSong } from "./services/search.service.js";
import { getSongById } from "./services/song.service.js";

searchSong("sawariya").then(data => console.log(data)).catch(error => console.log(error));