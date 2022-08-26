import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .hideButton {
        display: none;
      }

      .showButton {
        display: inline-block;
      }

      .container {
        margin: 10px;
      }

      mat-toolbar {
        position: sticky;
        top: 0px;
        z-index: 1;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
