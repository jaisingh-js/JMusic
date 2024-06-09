class SongList extends HTMLElement {
  // static observedAttributes = ["songs"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        #list {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            height: calc(100vh - 120px);
            margin-top: 50px;
          }
      

          /* Style the scrollbar */
            #list::-webkit-scrollbar {
            width: 8px;
            }

            #list::-webkit-scrollbar-track {
            background: #f1f1f1;
            }

            #list::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
            }

            #list::-webkit-scrollbar-thumb:hover {
            background: #555;
            }
        </style>
        <div id="list"></div>
        `;

    this.songs = null;

    /**
     * @type { HTMLDivElement }
     */
    this.list = this.shadowRoot.querySelector("#list");
  }

  connectedCallback() {
    console.log(this.songs);
  }

  attributeChangedCallback(property, oldValue, newValue) {
    // if(oldValue === newValue) {
    //     return;
    // }
    // this[property] = newValue;
    // console.log(this.songs.results);
    // this.renderSongs();
  }

  renderSongs() {
    this.list.replaceChildren();
    for (let song of this.songs.results) {
      const songElement = document.createElement("song-detail");
      songElement.content = song;
      this.list.appendChild(songElement);
    }
  }

  get content() {
    return this.songs;
  }

  set content(data) {
    this.songs = data;
    this.renderSongs();
  }

  disconnectedCallBack() {}
}

customElements.define("song-list", SongList);
