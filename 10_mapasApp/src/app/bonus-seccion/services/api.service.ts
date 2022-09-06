import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Feature, ResultadoBusqueda } from '../interfaces/resultado-busqueda';
import { PlacesApiClient } from '../api/places-api-client';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor(
    private placesApiClient: PlacesApiClient,
    private mapService: MapService
  ) {}

  public getLugaresByQuery(query: string): void {
    this.places = [];
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      return;
    }
    // const fullUrl = this._baseUrl + query + this._filtersApi + this._tokenApi;
    this.isLoadingPlaces = true;
    // PERO YO NO ESTOY BUSCANDO POR PROXIMIDAD SINO POR IP, POR LO QUE NO LO PONGO COMO EN EL CURSO
    // Y HABRIA QUE PASARSELO AL GET JUNTO AL QUERY
    // {params: { proximity: this.placesService.userLocation!.join(',')}}
    this.placesApiClient
      .get<ResultadoBusqueda>('/' + query + '.json')
      .subscribe({
        next: ({ features }) => {
          // const { features } = resp.features[0].;
          this.places = features;
          this.mapService.createMarkersFromPlaces(this.places);
        },
        complete: () => {
          this.isLoadingPlaces = false;
        },
      });
  }

  // constructor(private http: HttpClient) {}

  // public getLugaresByQuery(query: string): void {
  //   const fullUrl = this._baseUrl + query + this._filtersApi + this._tokenApi;
  //   this.isLoadingPlaces = true;
  //   this.http.get<ResultadoBusqueda>(fullUrl).subscribe({
  //     next: ({ features }) => {
  //       // const { features } = resp.features[0].;
  //       console.log(features);
  //       this.isLoadingPlaces = false;
  //       this.places = features;
  //     },
  //   });
}
