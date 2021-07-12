import { WebPlugin } from "@capacitor/core";
import type {
  AudioPluginPlugin,
  NowPlayingInfo,
  PlaylistItem,
} from "./definitions";

export class AudioPluginWeb extends WebPlugin implements AudioPluginPlugin {
  constructor() {
    super({
      name: "Audio",
      platforms: ["web"],
    });
  }

  current?: HTMLAudioElement;
  currentIndex = 0;
  audios?: HTMLAudioElement[];
  info?: NowPlayingInfo;

  playList({ items }: { items: PlaylistItem[] }) {
    this.audios = items.map((v: { src: string }, _) => {
      let audio = new Audio();
      audio.src = v.src;
      audio.load();
      return audio;
    });
    this.current = this.audios[0];
    this.currentIndex = 0;
    this.play();
  }

  triggerEvent(name: string) {
    var event; // The custom event that will be created
    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(name, true, true);
      // event.eventName = name;
      window.dispatchEvent(event);
    }
  }

  play() {
    if (this.current == null) {
      throw new Error("no current item to play");
    }
    const audios = this.audios;
    if (audios == null) {
      throw new Error("no playlist");
    }
    this.current.onended = () => {
      this.triggerEvent("playEnd");
      if (this.current === audios[audios.length - 1]) {
        this.triggerEvent("playAllEnd");
      } else {
        this.currentIndex += 1;
        this.current = audios[this.currentIndex];
        this.play();
      }
    };
    this.current.onpause = () => {
      this.triggerEvent("playPaused");
    };
    this.current.onplaying = () => {
      this.triggerEvent("playResumed");
    };
    this.current && this.current.play();
  }

  pausePlay() {
    this.current && this.current.pause();
  }

  resumePlay() {
    this.play();
  }

  setPlaying(info: NowPlayingInfo) {
    this.info = info;
    return new Promise<void>((r) => r());
  }
}
