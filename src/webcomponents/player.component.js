// class HelloWorld extends HTMLElement {
//   constructor() {
//     super();
//     this.name = "Jai";
//   }

//   //component attributes
//   static get observedAttributes() {
//     return ["name"];
//   }

//   //attribute change
//   attributeChangedCallback(property, oldValue, newValue) {
//     if (oldValue === newValue) return;
//     this[property] = newValue;
//   }

//   connectedCallback() {
//     this.textContent = `Hello, ${this.name}`;
//   }
// }

// customElements.define("hello-world", HelloWorld);

class Player extends HTMLElement {
  static observedAttributes = ["src", "name", "thumbnail"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
        #player-container {
          background-color: #fff;
          padding-bottom: 8px;
          display: flex;
          align-items: center;
        }
    
        #play-pause {
          border: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          margin: 0px 10px;
        }
    
        #slider {
          width: 100%;
        }
    
        #audio-length {
          font-size: 14px;
          margin: 0px 10px;
        }
    
        audio {
          display: none;
        }

        #name {
          display: block;
          margin: 0;
          font-size: 16px;
          text-align: center;
        }

        #container {
          position: fixed;
          bottom: 0px;
          width: 100vw;
          background-color: #fff;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
        }

        #name-img-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 5px;
          gap: 10px;
        }

        </style>

        <div id="container">
          <div id="name-img-container">
            <img id="thumbnail">
            <h3 id="name"></h3>
          </div>
          <div id="player-container">
              <button id="play-pause">&#9658;</button>
              <input type="range" min="1" max="100" value="0" class="slider" id="slider">
              <span id="audio-length">00:00/00:00</span>
              <audio id="audio" src=""></audio>
          </div>
        </div>
        `;


    this.isSeeking = false;
    this.src = "";

    /**
     * @type { HTMLButtonElement }
     */
    this.playPauseBtn = this.shadowRoot.querySelector("#play-pause");

    /**
     * @type { HTMLAudioElement }
     */
    this.audio = this.shadowRoot.querySelector("#audio");

    /**
     * @type { HTMLInputElement }
     */
    this.slider = this.shadowRoot.querySelector("#slider");

    /**
     * @type { HTMLSpanElement }
     */
    this.audioLength = this.shadowRoot.querySelector("#audio-length");


    /**
     * @type { HTMLDivElement }
     */
    this.name = this.shadowRoot.querySelector("#name");


    /**
     * @type { HTMLImageElement }
     */
    this.thumbnail = this.shadowRoot.querySelector("#thumbnail");

  }

  //element added
  connectedCallback() {
    // this.audio.src = "";
    this.playPauseBtn.addEventListener("click", () => {
      if (this.audio.paused && this.src.length > 0) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    });

    this.audio.addEventListener("ended", () => {
      this.playPauseBtn.innerHTML = "&#9658;";
    });

    this.audio.addEventListener("play", () => {
      this.playPauseBtn.innerHTML = "&#10074;&#10074;";
    });

    this.audio.addEventListener("pause", () => {
      this.playPauseBtn.innerHTML = "&#9658;";
    });

    this.audio.addEventListener("timeupdate", (ev) => {
      if(this.isSeeking) {
        return;
      }
      const percent = this.audio.currentTime / this.audio.duration * 100;
      this.slider.value = percent;
      const currMinutes = (Math.floor(this.audio.currentTime/60)).toString().padStart(2, 0);
      const currSeconds = (Math.floor(this.audio.currentTime%60)).toString().padStart(2, 0);
      const minutes = (Math.floor(this.audio.duration/60)).toString().padStart(2, 0);
      const seconds = (Math.floor(this.audio.duration%60)).toString().padStart(2, 0);
      this.audioLength.textContent = `${currMinutes}:${currSeconds}/${minutes}:${seconds}`
    });

    this.audio.addEventListener("loadedmetadata", (ev) => {
      // this.slider.max = this.audio.duration;
      this.slider.value = 0;
      const minutes = (Math.floor(this.audio.duration/60)).toString().padStart(2, 0);
      const seconds = (Math.floor(this.audio.duration%60)).toString().padStart(2, 0);
      this.audioLength.textContent = `00:00/${minutes}:${seconds}`
    });

    this.slider.addEventListener("mousedown", () => {
      this.isSeeking = true;
    });

    this.slider.addEventListener("mouseup", () => {
      this.isSeeking = false;
    });

    this.slider.addEventListener("input", (e) => {
      const currentTime = e.target.value / 100 * this.audio.duration;
      const currMinutes = (Math.floor(currentTime/60)).toString().padStart(2, 0);
      const currSeconds = (Math.floor(currentTime%60)).toString().padStart(2, 0);
      const minutes = (Math.floor(this.audio.duration/60)).toString().padStart(2, 0);
      const seconds = (Math.floor(this.audio.duration%60)).toString().padStart(2, 0);
      this.audioLength.textContent = `${currMinutes}:${currSeconds}/${minutes}:${seconds}`
    })

    this.slider.addEventListener('change', (e) => {
      // this.audio.pause();
      this.audio.currentTime = e.target.value / 100 * this.audio.duration;
      
      // this.audio.play();
    });
  }

  handlePlayPauseClick(event) {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  //attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    
    if(property === "src") {
      this.src = newValue;
      this.audio.pause();
      this.audio.src = newValue;
      this.audio.play();
    }
    // else if (property === "duration") {
    //   this.duration = newValue;
    //   this.slider.max = parseInt(this.duration);
    //   const minutes = (Math.floor(parseInt(this.duration)/60)).toString().padStart(2, 0);
    //   const seconds = (parseInt(this.duration)%60).toString().padStart(2, 0);
    //   this.audioLength.textContent = `00:00/${minutes}:${seconds}`
    // }

    else if(property === "name") {
      this.name.innerHTML = newValue;
    }

    else if(property === "thumbnail") {
      console.log(newValue);
      this.thumbnail.src = newValue;
    }
    
  }

  disconnectedCallback() {
    console.log("player component removed from dom");
  }
}

customElements.define("sweet-player", Player);
