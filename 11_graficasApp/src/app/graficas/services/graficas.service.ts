import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, delay } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsuariosRedesSociales(): Observable<any> {
    return this.http.get(this.baseUrl + 'grafica');
  }

  getUsuariosRedesSocialesDonaData(): Observable<any> {
    return this.getUsuariosRedesSociales().pipe(
      delay(1500),
      map((data) => {
        const labels = Object.keys(data);
        const values = Object.values(data);
        return { labels, values };
      })
    );
  }
}
