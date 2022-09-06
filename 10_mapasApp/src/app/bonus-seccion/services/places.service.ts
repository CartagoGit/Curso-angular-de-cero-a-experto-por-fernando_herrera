import { Injectable, EventEmitter } from '@angular/core';
import { Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation: [number, number] | undefined;
  private _watchGeoId: number = 0;
  private _map!: Map;
  get map() {
    return this._map;
  }
  set map(map: Map) {
    this._map = map;
    this.mapChange.emit(this._map);
  }

  get isMapReady(): boolean {
    return !!this._map;
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  public mapChange: EventEmitter<Map> = new EventEmitter();
  public geoLocChange: EventEmitter<[number, number]> = new EventEmitter();

  constructor() {}

  public async getUserLocation(): Promise<[number, number]> {
    if (!navigator.geolocation)
      throw new Error('No se puede activar la Geolocalización');
    return new Promise((resolve, reject) => {
      this._watchGeoId = navigator.geolocation.watchPosition(
        // navigator.geolocation.getCurrentPosition(
        (args) => {
          const { coords } = args;
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        },
        { timeout: 10_000 }
      );
    });
  }

  public stopWatcherGeo() {
    navigator.geolocation.clearWatch(this._watchGeoId);
  }
}
