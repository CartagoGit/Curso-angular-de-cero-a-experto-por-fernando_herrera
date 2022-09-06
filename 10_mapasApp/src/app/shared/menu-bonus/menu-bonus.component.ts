import { Component } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';

@Component({
  selector: 'app-menu-bonus',
  templateUrl: './menu-bonus.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MenuBonusComponent {
  menuItems: MenuItem[] = [
    {
      ruta: 'mapas-bonus/geolocalizacion',
      nombre: 'Geolocalización',
    },
    {
      ruta: 'mapas-bonus/buscador',
      nombre: 'Buscador',
    },
  ];
}
