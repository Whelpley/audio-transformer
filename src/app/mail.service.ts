import { Injectable } from '@angular/core';

@Injectable()
export class MailService {

  messages = [
    "You have some mail. Keep working though.",
    "I love hotdogs",
    "This message will explode in five seconds"

  ]

  constructor() { }

}
