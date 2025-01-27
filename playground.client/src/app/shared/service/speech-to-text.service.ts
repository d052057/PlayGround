import { Injectable } from '@angular/core';
declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class SpeechToTextService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text:string = '';
  public tempWords:string = '';
  constructor() { }
  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'km-KH'; // en-US

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.tempWords = transcript;
     /* console.log(transcript);*/
    });
  }
  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    /*console.log("Speech recognition started")*/
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        /*console.log("End speech recognition")*/
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    /*console.log("End speech recognition")*/
  }

  wordConcat() {
    if (this.tempWords.length > 0) {
      this.text = this.text + ' ' + this.tempWords;
      this.tempWords = '';
    }
  }
}
