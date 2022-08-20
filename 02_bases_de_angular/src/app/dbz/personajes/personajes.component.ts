import { Component, Input } from '@angular/core';
// import { IPersonaje } from '../interfaces/dbz.interfaces';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
})
export class PersonajesComponent {
  // @Input() personajes: IPersonaje[] = [];

  get personajes (){
    return this.dbzService.personajes;
  }

  constructor ( private dbzService: DbzService){}
}
