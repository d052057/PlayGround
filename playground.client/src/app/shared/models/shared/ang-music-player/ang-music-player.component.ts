import { Component, OnInit, effect, input, output } from '@angular/core';
import { AudioPlyerOptions } from './audioPlayer';
import { NgIf, NgStyle } from '@angular/common';
import { TimeConversionPipe } from '../../shared/pipe/time-conversion.pipe';
@Component({
    selector: 'ang-music-player',
    templateUrl: './ang-music-player.component.html',
    styleUrls: ['./ang-music-player.component.scss'],
    imports: [NgIf, NgStyle, TimeConversionPipe]
})
export class AngMusicPlayerComponent extends AudioPlyerOptions implements OnInit {
  /*logo = '/assets/calida.jpg';*/
  width = input();
  height = input();
  backgroundColor = input();
  audioTimeColor = input();
  audioTitleColor = input();
  volumeSliderColor = input();
  timeSliderColor = input();
  audioList = input<any[]>([]);
  next = input(true);
  previous = input(true);
  shuffle = input(true);
  repeat = input(true);
  scrollTitle = input(false);
  stateVolume = input<number>(10);
  playButtonColor = input("rgb(76, 130, 175)");
  pauseButtonColor = input("rgb(76, 130, 175)");
  nextButtonColor = input("rgb(76, 130, 175)");
  previousButtonColor = input("rgb(76, 130, 175)");
  repeatButtonColor = input("rgb(76, 130, 175)");
  activeRepeatButtonColor = input("rgb(76, 130, 175)");
  volumeButtonColor = input("rgb(76, 130, 175)");
  muteButtonColor = input("rgb(76, 130, 175)");
  nextEvent = output();
  previousEvent = output();
  repeatEvent = output();
  shuffleEvent = output();
  seekEvent = output<number>();
  stateEvent = output<string>();

  selectedAudio: any;
  currentAudioIndex = 0;
  repeatActive = false;
  isError = false;
  isShuffle = false;
  volumeBeforeMute: any;

  constructor() {
    super();
    effect(() => {
      this.initiateAudioPlayer()
    })
  }

  ngOnInit() {
    this.audioVolume = this.stateVolume();
    this.options();
    this.initiateAudioPlayer();
    //check audio is ended for next song
    this.isAudioEnded.subscribe(data => {
      if (!this.isRepeat && this.audioList().length > 0) {
        this.nextAudio();
      }
    })
  }

  nextAudio() {
    if (this.audioList().length - 1 != this.currentAudioIndex) {
      this.currentAudioIndex += 1;
      this.selectedAudio = this.audioList()[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.nextEvent.emit();
      
    } else {
      this.pause();
      this.stateEvent.emit("next");
    }
  }

  previousAudio() {
    if (this.currentAudioIndex != 0) {
      this.currentAudioIndex -= 1;
      this.selectedAudio = this.audioList()[this.currentAudioIndex];
      this.getAudioLength();
      if (this.isAudioPlaying) {
        this.play();
      }
      this.previousEvent.emit();
    }
    this.stateEvent.emit("previous");
  }

  seekAudio(seekAudioValue: any) {
    if (this.audioVolume != 0) {
      this.isMute = false;
    }
    this.audioPlayer().nativeElement.currentTime = seekAudioValue.target.value;
    this.seekEvent.emit(seekAudioValue.target.value);
  }

  repeatAudio() {
    this.isRepeat = !this.isRepeat;
    this.repeatActive = !this.repeatActive;
    this.audioPlayer().nativeElement.loop = this.isRepeat;
    this.repeatEvent.emit();
  }

  /*   shuffleAudio() {
      this.isShuffle = !this.isShuffle;
      if (this.isShuffle) {
      let randomItem = Math.floor(Math.random() * this.audioList().length);
      console.log(randomItem);
      
      }
      this.shuffleEvent.emit();
    } */

  volumeChange(volume: any) {
    this.audioPlayer().nativeElement.volume = volume.target.value / 100;
    this.audioVolume = volume;
  }

  muteAudio() {
    if (this.isMute) {
      this.audioPlayer().nativeElement.volume = 0.5;
      this.isMute = false;
    } else {
      this.audioPlayer().nativeElement.volume = 0;
      this.isMute = true;
    }
  }

  initiateAudioPlayer() {
    if (this.audioList().length <= 0) {
      this.isError = true;
    } else {
      this.selectedAudio = this.audioList()[this.currentAudioIndex];
      this.play();
    }
  }
}
