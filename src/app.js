import audioService from "./services/audio.service.js";

import "./webcomponents/player.component.js";
import "./webcomponents/search.component.js";
import "./webcomponents/list.component.js";
import "./webcomponents/song.component.js";

const app = document.getElementById("app");

// app.style.height = "100vh";

// searchSong("new person")
//     .then((results) => {
//         console.log("Song search successful: ", results);
//         const song = results.data.results[0];
//         const downloadUrlHigh = song.downloadUrl[song.downloadUrl.length - 1].url;
//         const sweetPlayer = document.createElement('sweet-player');
//         sweetPlayer.setAttribute("src", downloadUrlHigh);
//         app.appendChild(sweetPlayer);
//     })
//     .catch((error) => {
//         console.error("Error occured during song search: ", error);
//     })

const searchComponent = document.createElement("search-song");
app.appendChild(searchComponent);
const listComponent = document.createElement("song-list");
app.appendChild(listComponent);
const sweetPlayer = document.createElement('sweet-player');
app.appendChild(sweetPlayer);

searchComponent.addEventListener("search-results", (ev) => {
    listComponent.content = ev.detail;
});

audioService.bindAudioElement(sweetPlayer);