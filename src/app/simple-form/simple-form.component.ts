import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-form',
  template: `<div>
    <input #myInput type="text">
    <button (click)="onClick(myInput.value)">Click this every day!</button>
    </div>`,
  styles: []
})
export class SimpleFormComponent implements OnInit {

  onClick(value){
    console.log(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
