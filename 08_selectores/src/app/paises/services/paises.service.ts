import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of, switchMap } from 'rxjs';

import { Pais, PaisSmall } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _host: string = 'https://restcountries.com';
  private _version: string = 'v3.1';
  private _baseUrl: string = `${this._host}/${this._version}/`;
  private _fields: string = '?fields=cca3,name';

  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) {}

  // https://restcountries.com/v3.1/region/europe?fields=cca3,name
  getPaisesPorRegion(region: string): Observable<PaisSmall[] | null> {
    if (!region) return of(null);
    const endpoint: string = 'region/';
    const fullUrl: string = this._baseUrl + endpoint + region + this._fields;

    return this.http.get<PaisSmall[]>(fullUrl);
  }

  // https://restcountries.com/v3.1/alpha/{code}
  getPaisPorCodigo(code: string): Observable<Pais[] | null> {
    if (!code) return of(null);
    const endpoint: string = 'alpha/';
    const fullUrl: string = this._baseUrl + endpoint + code;

    return this.http.get<Pais[]>(fullUrl);
  }

  getPaisPorCodigoSmall(code: string): Observable<PaisSmall> {
    // if (!code) return of(null);
    const endpoint: string = 'alpha/';
    const fullUrl: string = this._baseUrl + endpoint + code;

    return this.http.get<PaisSmall[]>(fullUrl).pipe(
      switchMap((arrPais) => {
        return of(arrPais[0]);
      })
    );
    // return this.http.get<PaisSmall[]>
    //     (`${this.baseUrl}/alpha/?codes=${borderCodes}
    //     &fields=alpha3Code;name`);
  }

  getPaisesPorCodigos(borders: string[]): Observable<PaisSmall[]> {
    if (!borders) return of([]);
    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach((codigo) => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
