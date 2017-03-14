import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <input 
      #myInput 
      type="text" 
      [(ngModel)]="message"
      >
    <button (click)="update.emit({text:message})">Click this every day!</button>
   `,
  styles: [':host{display: flex; flex-direction: column;} input:focus{font-weight: bold}']
})
export class SimpleFormComponent implements OnInit {

  @Input() message;

  @Output() update = new EventEmitter();

  // onClick(event, value){
  //   console.log(event);
  //   console.log(value);
  // }

  // constructor() { 
  //   setInterval(()=> this.message = Math.random().toString(), 1000);
  // }

  ngOnInit() {
  }

}
