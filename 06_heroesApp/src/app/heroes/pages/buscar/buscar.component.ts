import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    if (this.termino.trim().length === 0) {
      this.heroes = [];
      return;
    }
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (this.heroes.length === 0) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: Heroe = event.option.value;

    this.heroesService
      .getHeroePorId(heroe.id!)
      .subscribe((resp) => (this.heroeSeleccionado = resp));
    this.heroes = [];
  }

  getOptionText(heroe: Heroe): string {
    return heroe && heroe.superhero ? heroe.superhero : '';
  }

  valueChange(value: any) {
    // console.warn('Evento ngModelChange');
    // console.log('typeof: ', typeof value);
    // console.log('valor:', value);
  }
}
