import { Component, OnInit } from '@angular/core';
// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        height: 100%;
        width: 100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/navigation-day-v1',
      center: [-5.965045218532293, 37.397177870864695], // Latitud y Longitus, a la inversa que en google maps
      zoom: 15,
    });
  }
}
