import { Injectable } from '@angular/core';

@Injectable()
export class MailService {

  messages = [
    {id:0, text:"You have some mail. Keep working though."},
    {id:1, text:"I love hotdogs"},
    {id:2, text:"This message will explode in five seconds"}
  ]

  update(id,text){
    this.messages = this.messages.map(m => 
      m.id === id
        ? {id, text}
        : m
    )
  }

  constructor() { }

}
