import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [],
})
export class DinamicosComponent {
  persona: Persona = {
    nombre: 'Mario',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'DeathStranding' },
    ],
  };

  nuevoJuego: string = '';

  agregar() {
    const id: number =
      this.persona.favoritos.length > 0
        ? this.persona.favoritos[this.persona.favoritos.length - 1].id + 1
        : 1;
        
    this.persona.favoritos.push({
      id: id,
      nombre: this.nuevoJuego,
    });
    this.nuevoJuego = '';
  }

  borrar(indice: number) {
    this.persona.favoritos.splice(indice, 1);
  }

  guardar() {}
}
