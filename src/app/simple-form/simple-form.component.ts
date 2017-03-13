import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `<div>
    <input #myInput type="text">
    <button (mouseover)="onClick($event, myInput.value)">Click this every day!</button>
    </div>`,
  styles: []
})
export class SimpleFormComponent implements OnInit {

  onClick(event, value){
    console.log(event);
    console.log(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
