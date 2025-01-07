import { searchSong } from "./src/services/api.service.js";
import player from "./src/services/player.service.js";

console.log("app.js running");

const container = document.querySelector(".grid-container");
/**
 * @type {HTMLInputElement}
 */
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const searchForm = document.querySelector(".search");

async function findSong() {
  const query = searchInput.value;
  if (query.length > 0) {
    const song = await searchSong(query);
    console.log("found songs: ", song);
    if (song.success) {
      const songs = song.data.results;
      updateSongList(songs);
    }
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  findSong();
});

const song = await searchSong("punjabi");
if (song.success) {
  const songs = song.data.results;
  updateSongList(songs);
}

function updateSongList(songs) {
  container.replaceChildren();

  songs.forEach((element) => {
    const songDiv = document.createElement("div");
    songDiv.classList.add("song");
    songDiv.innerHTML = `
          <img src="${element.image[1].url}" alt="${element.name}" />
          <p class="song-title">${element.name}</p>
      `;

    songDiv.onclick = () => {
      playSong(element);
    };

    container.appendChild(songDiv);
  });
}

function playSong(element) {
  console.log("starting playing song: ", element);
  player.play(element.downloadUrl[4].url);
}

document
  .getElementById("pause")
  .addEventListener("click", () => player.pause());
