import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `
    <input 
      #myInput 
      type="text" 
      [(ngModel)]="message"
      [ngClass]="{mousedown:isMouseDown}"
      (mousedown)="isMouseDown = true"
      (mouseup)="isMouseDown = false"
      (mouseleave)="isMouseDown = false"
      >
    <button (click)="update.emit({text:message})">Click this every day!</button>
   `,
  styles: [':host{display: flex; flex-direction: column;} .mousedown{border: 2px solid green} input:focus{font-weight: bold; outline: none;} button{border: none;}']
})
export class SimpleFormComponent implements OnInit {

  isMouseDown;

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
