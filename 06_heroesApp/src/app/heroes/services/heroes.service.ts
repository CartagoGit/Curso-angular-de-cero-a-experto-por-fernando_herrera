import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from './../interfaces/heroe.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  // private _url: string = 'http://localhost:3000';

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    const endpoint = 'heroes';
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.get<Heroe[]>(fullUrl);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    const endpoint = `heroes/${id}`;
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.get<Heroe>(fullUrl);
  }

  getSugerencias(termino: string, limite: number = 5): Observable<Heroe[]> {
    // http://localhost:3000/heroes?q=superman&limit=5
    const paramSearch = `q=${termino}&limit=${limite}`;
    const endpoint = `heroes?${paramSearch}`;
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.get<Heroe[]>(fullUrl);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    const endpoint = 'heroes';
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.post<Heroe>(fullUrl, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    const endpoint = `heroes/${heroe.id}`;
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.put<Heroe>(fullUrl, heroe);
  }

  borrarHeroe(id: string): Observable<any> {
    const endpoint = `heroes/${id}`;
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<any>(fullUrl);
  }
}
