import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Define Date
  date: Date = new Date();
  d = this.date.getFullYear();

  constructor(){}

}