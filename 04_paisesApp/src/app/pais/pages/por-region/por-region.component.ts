import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from './../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  getClaseCSS(region: string): string {
    return `btn ${
      region === this.regionActiva ? 'btn-primary' : 'btn-outline-primary'
    }`;
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;
    this.hayError = false;
    this.paises = [];
    this.regionActiva = region;
    this.paisService.buscarRegion(region).subscribe({
      next: (resp) => {
        this.paises = resp;
      },
      error: () => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }
}
