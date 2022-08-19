import { Component, Input } from '@angular/core';
import { IPersonaje } from '../interfaces/dbz.interfaces';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
})
export class PersonajesComponent {
  @Input() personajes: IPersonaje[] = [];
}
