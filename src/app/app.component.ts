import { Component, Inject, OnInit } from '@angular/core';
// import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit {
    private audioContext: AudioContext;
    private loadingSample: boolean = false;
    private audioBuffer: AudioBuffer;
    private playbackRate: number = 1.0;
    private gain: number = 1.0;

    title = 'I am ready to LEARN ANGULAR!';

    onUpdate(id, text){
      this.mail.update(id, text);
    }

    constructor(
        @Inject('mail') private mail
    ){}

    ngOnInit() {
      this.audioContext = new AudioContext();
      this.loadingSample = true;
      this.fetchSample()
          .then(audioBuffer => {
              this.loadingSample = false;
              this.audioBuffer = audioBuffer;
          })
          .catch(error => throw error);
  }

    fetchSample(): Promise<AudioBuffer> {
        return fetch('./assets/samples/toilet_flushing.wav')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                return new Promise((resolve, reject) => {
                    this.audioContext.decodeAudioData(
                        buffer,
                        resolve,
                        reject
                    );
                })
            });
    }

    playSample() {
      let bufferSource = this.audioContext.createBufferSource();
      bufferSource.buffer = this.audioBuffer;
      bufferSource.playbackRate.value = this.playbackRate;
      let gainNode = this.audioContext.createGain();
      gainNode.gain.value = this.gain;
      bufferSource.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      bufferSource.start(0);

    }


    onClick() {
        this.playSample();
    }

}
