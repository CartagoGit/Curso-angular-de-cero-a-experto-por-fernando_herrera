import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }

      .mat-card-image {
        border-radius: 100px !important;
        max-height: 400px;
      }

    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe;
}
