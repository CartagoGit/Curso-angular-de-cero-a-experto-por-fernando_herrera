import { Injectable } from '@angular/core';
import { IPersonaje } from '../interfaces/dbz.interfaces';

@Injectable()
export class DbzService {
  private _personajes: IPersonaje[] = [
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

  get personajes(): IPersonaje[] {
    return [...this._personajes];
  }

  constructor() {
    console.log('Servicio dbz inicializado');
  }

  agregarPersonaje(personaje: IPersonaje) {
    this._personajes.push(personaje);
  }
}
