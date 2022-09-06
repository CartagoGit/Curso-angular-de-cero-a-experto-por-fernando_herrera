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
      .bonus{
        cursor: auto;
        background-color: #6F0386;
        color: white
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
      ruta: 'mapas/zoom-range',
      nombre: 'Zoom Range',
    },
    {
      ruta: 'mapas/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: 'mapas/propiedades',
      nombre: 'Propiedades',
    },
  ];
}
