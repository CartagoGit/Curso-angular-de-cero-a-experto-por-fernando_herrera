import { Component } from '@angular/core';
import { IPersonaje } from '../interfaces/dbz.interfaces';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {

  nuevo: IPersonaje = {
    nombre: 'Maestro Roshi',
    poder: 99999999,
  };

  constructor() {
  }
}
