class AudioService {
    constructor() {
        this.song = null;
        this.audioElement = null;
    }

    set content(song) {
        if(!song) {
            return;
        }
        this.song = song;
        this.songChanged();
    }

    get content() {
        return this.song;
    }

    bindAudioElement(audioElement) {
        this.audioElement = audioElement;
    }

    songChanged() {
        if(!this.audioElement) {
            return;
        }
        console.log(this.song);
        this.audioElement.setAttribute("src", this.song.downloadUrl[this.song.downloadUrl.length - 1].url);
        this.audioElement.setAttribute("name", this.song.name);
        this.audioElement.setAttribute("thumbnail", this.song.image[0].url);
    }
}


const audioService = new AudioService();
// Object.freeze(audioService);

export default audioService;