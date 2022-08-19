import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPersonaje } from '../interfaces/dbz.interfaces';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent {
  @Input() nuevo: IPersonaje = {
    nombre: '',
    poder: 0,
  };

  @Output() onNuevoPersonaje: EventEmitter<IPersonaje> = new EventEmitter();

  agregar() {
    if (this.nuevo.nombre.trim().length === 0 || this.nuevo.poder < 0) return;
    // console.log(this.nuevo);

    this.onNuevoPersonaje.emit(this.nuevo);

    this.nuevo = {
      nombre: '',
      poder: 0,
    };
  }
}
