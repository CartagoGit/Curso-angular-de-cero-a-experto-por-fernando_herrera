import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

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
  get auth(): Auth {
    return this.authService.auth;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/']);
  }
}
