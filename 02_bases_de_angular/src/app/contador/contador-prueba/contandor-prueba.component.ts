import { Component } from '@angular/core';

@Component({
  selector: 'app-contador-prueba',
  template: `
    <h1>{{ titulo }}</h1>

    <h3>Directo "numero = numero + 1"</h3>
    <button (click)="numero = numero + 1">+1</button>
    <span>{{ numero }}</span>
    <button (click)="numero = numero - 1">-1</button>

    <hr />
    <h3>Con funciones individuales para sumar() y restar()</h3>
    <button (click)="sumar()">+1</button>
    <span>{{ numero }}</span>
    <button (click)="restar()">-1</button>

    <hr />
    <h3>Con la misma funcion para ambas -> acumular(value)</h3>
    <button (click)="acumular(+1)">+1</button>
    <span>{{ numero }}</span>
    <button (click)="acumular(-1)">-1</button>

    <hr />
    <h2>Con una base</h2>
    <h3>
      La base es: <strong>{{ base }}</strong>
    </h3>

    <button (click)="acumular(base)">+{{ base }}</button>
    <span>{{ numero }}</span>
    <button (click)="acumular(-base)">{{ -base }}</button>
  `,
})
export class ContadorPruebaComponent {
  public titulo: string = 'Contador de Pruebas de distintas formas';
  public numero: number = 10;
  public base: number = 5;

  sumar() {
    this.numero += 1;
  }

  restar() {
    this.numero -= 1;
  }

  acumular(valor: number) {
    this.numero += valor;
  }
}
