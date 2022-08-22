import { Component} from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Capital } from '../../interfaces/capital.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent  {

  termino: string = '';
  hayError: boolean = false;
  capitales: Capital[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino).subscribe({
      next: (resp) => {
        this.capitales = resp;
      },
      error: () => {
        this.hayError = true;
        this.capitales = [];
      },
    });
  }

  sugerencias(termino: string) {
    this.hayError = false;
  }
}
