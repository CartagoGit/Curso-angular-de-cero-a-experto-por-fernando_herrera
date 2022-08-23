import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [],
})
export class NoComunesComponent {
  //i18nSelect
  nombre: string = 'Mario';
  genero: string = 'masculino';
  invitacionMap = {
    masculino: 'invitarlo',
    femenino: 'invitarla',
  };

  //i18nPlural
  clientes: string[] = ['Maria', 'Pedro', 'Juan', 'Rosa'];
  clientesInit: string[] = ['Maria', 'Pedro', 'Juan', 'Rosa'];
  clientesMap = {
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos un cliente esperando',
    other: 'tenemos # clientes esperando',
  };
  clientesButtonMap = {
    '=0': 'Reiniciar',
    other: 'Atender a cliente',
  };

  //KeyValue Pipe
  persona = {
    nombre: 'Mario',
    edad: 34,
    direccion: 'Fukushima, Japón',
  };

  //Json Pipe
  heroes = [
    { nombre: 'Superman', vuela: true },
    { nombre: 'Robin', vuela: false },
    { nombre: 'Aquaman', vuela: false },
  ];

  //Async Pipe
  miObservable = interval(1000);

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data de la promesa');
    }, 3500);
  });

  cambiarGenero() {
    if (this.nombre === 'Mario') {
      this.nombre = 'Olga';
      this.genero = 'femenino';
    } else {
      this.nombre = 'Mario';
      this.genero = 'masculino';
    }
  }

  borrarCliente() {
    if (this.clientes.length <= 0) {
      this.clientes = [...this.clientesInit];
    } else {
      this.clientes.pop();
    }
  }
}
