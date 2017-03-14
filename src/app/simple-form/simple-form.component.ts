import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `<div>
    <input 
      #myInput 
      type="text" 
      [(ngModel)]="message"
      >
    <button (click)="update.emit({text:message})">Click this every day!</button>
    </div>`,
  styles: []
})
export class SimpleFormComponent implements OnInit {

  @Input() message;

  @Output() update = new EventEmitter();

  // onClick(event, value){
  //   console.log(event);
  //   console.log(value);
  // }

  onUpdate(id, event){
    this.mail.update(id, text);
  }

  // constructor() { 
  //   setInterval(()=> this.message = Math.random().toString(), 1000);
  // }

  ngOnInit() {
  }

}
