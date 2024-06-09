import audioService from "../services/audio.service.js";

class SongDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          #card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            height: 280px; /* Set fixed height for card */
            width: 200px;
            display: flex;
            flex-direction: column;
            align-i
          }
      
          #card img {
            width: 100%;
            max-width: 200px;
            object-fit: contain; /* Ensure the image fills the container */
            border-radius: 8px 8px 0 0;
          }
      
          #content {
            padding: 10px;
          }
      
          #content h3 {
            margin: 0;
            font-size: 16px;
          }
        </style>
        <div id="card">
          <img id="image">
          <div id="content">
            <h3 id="name">Song Name</h3>
          </div>
        </div>
        `;

    this.song = null;

    /**
     * @type { HTMLDivElement }
     */
    this.name = this.shadowRoot.querySelector("#name");

    /**
     * @type { HTMLImageElement }
     */
    this.image = this.shadowRoot.querySelector("#image");

    /**
     * @type { HTMLDivElement }
     */
    this.card = this.shadowRoot.querySelector("#card");
  }

  set content(data) {
    this.song = data;
    this.renderSong();
  }

  get content() {
    return this.song;
  }

  connectedCallback() {
    this.card.addEventListener("click", (ev) => {
      this.handleSongClick();
    });
  }

  handleSongClick() {
    audioService.content = this.song;
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    this[property] = newValue;
    this.renderSong();
  }

  renderSong() {
    this.image.src = this.song.image[2].url;
    this.name.innerHTML = this.song.name;
  }

  disconnectedCallback() {}
}

customElements.define("song-detail", SongDetail);
