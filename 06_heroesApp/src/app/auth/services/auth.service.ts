import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient) {}

  verificaAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    console.log(token);
    if (!token) return of(false);
    return this.login(token!).pipe(
      map((auth)=> {
        this._auth = auth;
        return true;
      })
    );
  }

  login(id: string): Observable<Auth> {
    const endpoint = `usuarios/${id}`;
    const fullUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.get<Auth>(fullUrl).pipe(
      tap((resp) => {
        this._auth = resp;
        localStorage.setItem('token', this._auth.id);
      })
    );
  }

  logout() {
    this._auth = undefined;
  }
}
