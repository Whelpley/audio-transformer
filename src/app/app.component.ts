import { Component, Inject, OnInit } from '@angular/core';
// import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'I am ready to LEARN ANGULAR!';

//   onUpdate(id, text){
//     this.mail.update(id, text);
//   }

//   constructor(
//       @Inject('mail') private mail
//   ){}
// }

export class AppComponent  implements OnInit {
    private audioContext: AudioContext;
    private loadingSample: boolean = false;
    private audioBuffer: AudioBuffer;

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
        bufferSource.connect(this.audioContext.destination);
        bufferSource.start(0);
    }

    onClick() {
        this.playSample();
    }

}
