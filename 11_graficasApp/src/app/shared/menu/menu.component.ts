import { Component } from '@angular/core';
interface MenuItem {
  ruta: string;
  texto: string;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuComponent {
  endpoint: string = 'graficas/';
  menu: MenuItem[] = [
    { texto: 'Barras', ruta: this.endpoint + 'barras' },
    { texto: 'Barras Dobles', ruta: this.endpoint + 'barras-dobles' },
    { texto: 'Dona', ruta: this.endpoint + 'dona' },
    { texto: 'Dona Http', ruta: this.endpoint + 'dona-http' },
  ];
}
