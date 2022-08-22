import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { Capital } from '../interfaces/capital.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';
  private _endpoint: string = '';

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    this._endpoint = 'name';
    const url = `${this._apiUrl}/${this._endpoint}/${termino}`;
    return this.http.get<Country[]>(url);
  }

  buscarCapital(termino: string): Observable<Capital[]> {
    this._endpoint = 'capital';
    const url = `${this._apiUrl}/${this._endpoint}/${termino}`;
    return this.http.get<Capital[]>(url);
  }

  getPaisPorId(id: string): Observable<Country[]> {
    this._endpoint = 'alpha';
    const url = `${this._apiUrl}/${this._endpoint}/${id}`;
    return this.http.get<Country[]>(url);
  }
}
