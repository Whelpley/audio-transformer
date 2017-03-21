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
    private playbackRate: number = 1.0;
    private gain: number = 1.0;

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

      this.visualize();
    }

    visualize() {
      var canvas = document.querySelector('.visualizer');
      var canvasCtx = canvas.getContext("2d");

      var intendedWidth = document.querySelector('.wrapper').clientWidth;

      canvas.setAttribute('width', intendedWidth);
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;


      var visualSetting = "sinewave";
      console.log("Visual Setting: " + visualSetting);

      var analyser = this.audioContext.createAnalyser();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;

      if(visualSetting === "sinewave") {
        analyser.fftSize = 2048;
        var bufferLength = analyser.fftSize;
        console.log("Buffer length: " + bufferLength);
        var dataArray = new Uint8Array(bufferLength);

        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        this.draw(analyser, canvas, canvasCtx, dataArray);

      };
  }

       draw(analyser, canvas, canvasCtx, dataArray) {
         // wtf is requestAnimationFrame()?
          var WIDTH = canvas.width;
          var HEIGHT = canvas.height;
          var drawVisual = requestAnimationFrame(this.draw);

          analyser.getByteTimeDomainData(dataArray);

          canvasCtx.fillStyle = 'rgb(200, 200, 200)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

          canvasCtx.beginPath();

          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;

          for(var i = 0; i < bufferLength; i++) {
      
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT/2;

            if(i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx.lineTo(canvas.width, canvas.height/2);
          canvasCtx.stroke();
    };

    onClick() {
        this.playSample();
    }

}
