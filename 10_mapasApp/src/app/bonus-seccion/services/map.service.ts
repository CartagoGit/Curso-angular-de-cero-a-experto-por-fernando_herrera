import { Injectable } from '@angular/core';
import { LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/resultado-busqueda';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private _map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this._map;
  }

  setMap(map: Map) {
    this._map = map;
  }

  constructor() {}

  flyTo(coords: LngLatLike, zoom: number = 15) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    this._map?.flyTo({ center: coords, zoom });
  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this._map) throw Error('Mapa no inicializado');
    this.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
      `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this._map);

      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;
  }
}
