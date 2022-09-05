import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interfaces';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private urlAuth: string = this.baseUrl + '/auth';

  private _usuario!: User;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  public register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse | HttpErrorResponse> {
    const url: string = this._crearFullUrl('/new');
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) localStorage.setItem('token', resp.token!);
      }),
      catchError((err: HttpErrorResponse) => of(err))
    );
  }

  public login(
    email: string,
    password: string
  ): Observable<AuthResponse | HttpErrorResponse> {
    const url: string = this._crearFullUrl();
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) localStorage.setItem('token', resp.token!);
      }),
      // map((resp) => resp.msg!),
      // catchError((err) => of(err.error.msg))
      catchError((err: HttpErrorResponse) => {
        return of(err);
      })
    );
  }

  public validarToken(): Observable<boolean> {
    const url: string = this._crearFullUrl('/renew');
    const headers: HttpHeaders = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );
    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        };
        return resp.ok;
      }),
      catchError(() => of(false))
    );
  }

  public logout(): void {
    localStorage.clear();
  }

  private _crearFullUrl(endpoint: string = ''): string {
    return this.urlAuth + endpoint;
  }
}
