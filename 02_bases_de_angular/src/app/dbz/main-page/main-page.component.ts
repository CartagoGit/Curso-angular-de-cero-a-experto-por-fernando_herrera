import { Component } from '@angular/core';
import { IPersonaje } from '../interfaces/dbz.interfaces';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  personajes: IPersonaje[] = [
    {
      nombre: 'Goku',
      poder: 15000,
    },
    {
      nombre: 'Krilin',
      poder: 750,
    },
    {
      nombre: 'Vegetta',
      poder: 8500,
    },
  ];

  nuevo: IPersonaje = {
    nombre: 'Maestro Roshi',
    poder: 99999999,
  };

  agregarNuevoPersonaje(argumento: IPersonaje) {
    // console.log('se llamo agregar nuevo personaje');
    // console.log(argumento);
    this.personajes.push(argumento)
  }
}
