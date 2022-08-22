import { Component, Input, NgIterable } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { Capital } from '../../interfaces/capital.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styles: [],
})
export class PaisTablaComponent {
  @Input() paises: (Capital | Country)[] = [];
}
