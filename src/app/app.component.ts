import { Component, Inject } from '@angular/core';
// import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'I am ready to LEARN ANGULAR!';

  constructor(
    @Inject('mail') private mail,
    @Inject('api') private api,
    @Inject('secret') private secret
    
    
    
    ){}
}
