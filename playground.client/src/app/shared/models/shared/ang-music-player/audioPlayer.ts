import { ElementRef, Component, output, viewChild } from '@angular/core'
import { Subject } from 'rxjs';

@Component({
    template: '',
    standalone: false
})

export class AudioPlyerOptions {
  totalAudioLength: number = 0;
  currentAudioTime = 0;
  isAudioLoaded: boolean = false;
  isAudioPlaying: boolean = false;
  isRepeat: boolean = false;
  audioVolume: number = 50;
  isAudioEnded = new Subject;
  isMute = false;
  playEvent = output();
  pauseEvent = output();

  //Access audio player dom
  readonly audioPlayer = viewChild.required<ElementRef>('audioPlayer');
  
  //get audio player events
  options(): void {
    //emit event when playing audio
    this.audioPlayer().nativeElement.addEventListener('playing', () => {
    });

    //emit when intial loading of audio
    this.audioPlayer().nativeElement.addEventListener('loadeddata', () => {
      this.isAudioLoaded = true;
      this.getAudioLength();
    });

    //emit time on playing audio
    this.audioPlayer().nativeElement.addEventListener('timeupdate', () => {
      //get current audio time
      this.currentAudioTime = Math.floor(this.audioPlayer().nativeElement.currentTime);
      //check if audio is ended for next song and pass data to component
      if (this.audioPlayer().nativeElement.ended) {
        this.isAudioEnded.next(true);
      }
    });

    this.audioPlayer().nativeElement.addEventListener('volumechange', () => {
      this.audioVolume = (Math.floor(this.audioPlayer().nativeElement.volume * 100));
      if (this.audioVolume == 0) {
        this.isMute = true;
      } else {
        this.isMute = false;
      }
    })
  }


  play() {
    //toggle play-pause button
    this.isAudioPlaying = true;
    //play when user click play button
    setTimeout(() => {
      this.audioPlayer().nativeElement.play();
      this.playEvent.emit();
     }, 0);
  }

  pause() {
    //toggle play-pause button
    this.isAudioPlaying = false;
    //pause when user click pause button
    setTimeout(() => {
      this.audioPlayer().nativeElement.pause();
      this.pauseEvent.emit();
     }, 0);
  }

  getAudioLength() {
    this.totalAudioLength = Math.floor(this.audioPlayer().nativeElement.duration);
  }
}
