import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _url: string = 'https://api.giphy.com/v1/gifs';
  private _endpoint: string = '/search';
  private _apiKey: string = '1o63CKEIvm89Q8ngKphcXyQ155NQ4fsd';
  private _limite: number = 10;

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    if (this._historial[0]) this.buscarGifs(this.historial[0]);

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (this._historial.includes(query)) {
      this._historial = this._historial.filter((item) => item !== query);
    }
    this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', this._limite.toString())
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this._url}/${this._endpoint}`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
      });
  }
}
