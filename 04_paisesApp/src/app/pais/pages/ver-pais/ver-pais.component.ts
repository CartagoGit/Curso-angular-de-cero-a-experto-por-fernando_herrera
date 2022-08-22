import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activadtedRoute: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit(): void {
    // this.activadtedRoute.params.subscribe(({ id }) => {
    //   console.log(id);
    //   this.paisService.getPaisPorId(id).subscribe((pais) => {
    //     console.log(pais[0]);
    //   });
    // });

    this.activadtedRoute.params
      .pipe(switchMap(({ id }) => this.paisService.getPaisPorId(id)),
      tap())
      .subscribe((pais) => (this.pais = pais[0]));
  }
}
