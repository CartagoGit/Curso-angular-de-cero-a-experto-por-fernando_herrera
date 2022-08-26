import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    // Ir al backend
    // un usuario en servicio
    this.authService.login('1').subscribe({
      next: (resp: Auth) => {
        if (resp.id) {
          this.router.navigate(['./heroes']);
        } else {
        }
      },
      error: (error) => {
        console.error(
          'No existe usuario con esa id',
          '-',
          'Error del tipo: ',
          error
        );
      },
    });
  }
}
