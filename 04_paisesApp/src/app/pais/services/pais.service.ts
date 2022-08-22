import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';
import { Capital } from '../interfaces/capital.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';
  private _endpoint: string = '';
  private _filters: string = 'name,capital,cca3,flags,population';
  // private _params =new HttpParams().set('fields', this._filters);

  get httpParams(){
    return new HttpParams().set('fields', this._filters);
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    this._endpoint = 'name';
    const url = `${this._apiUrl}/${this._endpoint}/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Capital[]> {
    this._endpoint = 'capital';
    const url = `${this._apiUrl}/${this._endpoint}/${termino}`;
    return this.http.get<Capital[]>(url, { params: this.httpParams });
  }

  getPaisPorId(id: string): Observable<Country[]> {
    this._endpoint = 'alpha';
    const url = `${this._apiUrl}/${this._endpoint}/${id}`;
    return this.http.get<Country[]>(url);
  }

  buscarRegion(termino: string): Observable<Country[]> {
    this._endpoint = 'region';
    const url = `${this._apiUrl}/${this._endpoint}/${termino}`;
    console.log(url);
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}
