import { Component, Inject, OnInit } from '@angular/core';
// import { MailService } from './mail.service';

@Component({
  selector: 'my-app',
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
    }
    
    fetchSample(): Promise<AudioBuffer> {
        return fetch('samples/snare.wav')
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
}
