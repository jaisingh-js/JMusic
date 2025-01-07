class Player {
    constructor() {
        if(!Player.instance) {
            Player.instance = this;
            this.init();
            return Player.instance;
        }
    }

    init() {
        /** 
         * @type {HTMLAudioElement}
        */
        this.audio = new Audio();
        /**
         * @type {boolean}
         */
        this.isPlaying = false;

        /**
         * @type {string}
         */
        this.currentUrl = '';
    }


    play(url) {
        if(this.currentUrl !== url) {
            this.stopCurrentSong();
            this.audio.src = url;
            this.currentUrl = url;
            this.audio.play().then().catch(error => console.log(error));
            this.isPlaying = true;
        }
        else if(!this.isPlaying) {
            this.audio.play();
            this.isPlaying = true;
        }

    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    stopCurrentSong() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }


}

const player = new Player();
export default player;