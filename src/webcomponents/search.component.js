import { searchSong } from "../services/search.service.js";

class Search extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <style>
    #search-component {
      position: fixed;
      top: 0px;
      width: 100vw;
      height: 30px;
      background-color: #fff;
      padding-top: 10px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      
    }

    #search {
      flex: 1;
      margin-left: 10px;
      padding: 8px;
      border: none;
      outline: none;
      font-size: 16px;
    }

    #search-btn {
      padding: 8px 20px;
      margin-left: 10px;
      margin-right: 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    </style>

    <div id="search-component">
      <input id="search" type="text">
      <button id="search-btn">search</button>
    </div>
    `;

    this.searchedText = "";
  }

  connectedCallback() {
    /**
     * @type { HTMLInputElement }
     */
    this.search = this.shadowRoot.querySelector("#search");

    /**
     * @type { HTMLButtonElement }
     */
    this.searchBtn = this.shadowRoot.querySelector("#search-btn");

    this.search.addEventListener("keydown", (ev) => {
      if (ev.key == "Enter") {
        this.handleSearch(this.search.value);
      }
      // this.handleSearch(ev)
    });

    this.searchBtn.addEventListener("click", (ev) => {
      this.handleSearch(this.search.value);
    });
  }

  debounceInput(func, delay) {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  handleSearch(text) {
    if (text.length < 3 || text === this.searchedText) {
      return;
    }

    this.searchedText = text;

    searchSong(text)
      .then((results) => {
        this.dispatchEvent(
          new CustomEvent("search-results", { detail: results.data })
        );
      })
      .catch((error) => {
        console.error(error);
        this.searchedText = "";
      });
  }

  disconnectedCallback() {}
}

customElements.define("search-song", Search);
