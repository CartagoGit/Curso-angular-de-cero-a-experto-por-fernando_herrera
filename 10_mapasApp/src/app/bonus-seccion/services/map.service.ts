import { Injectable, EventEmitter } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/resultado-busqueda';
import { Route } from '../interfaces/resultado-ruta';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private _map?: Map;
  private markers: Marker[] = [];
  public colorMarkers: string[] = [];

  public distance: number = 0;
  public time: string = '';

  get isMapReady() {
    return !!this._map;
  }

  getMap(): Map {
    return this._map!;
  }

  setMap(map: Map) {
    this._map = map;
    this.mapChange.emit(this._map);
  }

  public mapChange: EventEmitter<Map> = new EventEmitter();

  constructor() {}

  flyTo(coords: LngLatLike, zoom: number = 15) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    this._map?.flyTo({ center: coords, zoom });
  }

  createMarkersFromPlaces(places: Feature[]) {
    if (!this._map) throw Error('Mapa no inicializado');
    this.markers.forEach((marker) => marker.remove());
    this.colorMarkers = [];
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text}</h6>
        <span>${place.place_name}</span>
      `);
      const color = '#xxxxxx'.replace(/x/g, (y) =>
        ((Math.random() * 16) | 0).toString(16)
      );
      const newMarker = new Marker({ color })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this._map);

      newMarkers.push(newMarker);
      this.colorMarkers.push(color);
    }
    this.markers = newMarkers;

    if (places.length === 0) return;
    // LIMITES DEL MAPA PARA AJUSTAR EL ZOOM
    const bounds: LngLatBounds = new LngLatBounds();
    this.markers.forEach((marker) => bounds.extend(marker.getLngLat()));

    this._map.fitBounds(bounds, { padding: 200, offset: [-40, 0] });
  }

  removeMarkers() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.colorMarkers = [];
  }

  createMarkersForRoutes(lng: number, lat: number): Marker[] {
    if (!this._map) throw Error('Mapa no inicializado');
    this.distance = 0;
    this.time = '';
    if (this._map.getLayer('RouteString')) {
      this._map.removeLayer('RouteString');
      this._map.removeSource('RouteString');
    }
    const newMarker = new Marker().setLngLat([lng, lat]).addTo(this._map);
    if (this.markers.length === 2) {
      this.markers[0].remove();
      this.markers.shift();
    }
    this.markers.push(newMarker);
    return this.markers;
  }

  drawPolyline(route: Route) {
    // console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if (!this._map) throw Error('El mapa no esta inicializado');
    this.distance = route.distance / 1000;
    this.time = this.secondsToHms(route.duration);
    // console.log(this.time);
    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this._map?.fitBounds(bounds, { padding: 200, offset: [-40, 0] });

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    this._map.addSource('RouteString', sourceData);

    this._map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    });
  }

  secondsToHms(d: number) {
    d = Number(d);
    const h: number = Math.floor(d / 3600);
    const m: number = Math.floor((d % 3600) / 60);
    const s: number = Math.floor((d % 3600) % 60);

    const hDisplay: string = h > 0 ? h + 'h ' : '';
    const mDisplay: string = m > 0 ? m + 'm ' : '';
    const sDisplay: string = s > 0 ? s + 's' : '0s';
    return hDisplay + mDisplay + sDisplay;
  }
}
