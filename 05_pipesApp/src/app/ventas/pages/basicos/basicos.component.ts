import { Component } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent {
  // nombreLower: string = 'mario';
  // nombreUpper: string = 'MARIO';
  nombreCompleto: string = 'mArIO';

  fecha: Date = new Date(); //el dia de hoy
}
