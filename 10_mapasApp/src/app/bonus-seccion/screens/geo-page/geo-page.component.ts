import { Component, OnInit } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-geo-page',
  templateUrl: './geo-page.component.html',
  styles: [
    `
      .geolocalizacion {
        position: fixed;
        right: 20px;
        top: 20px;
        z-index: 90;
      }
      .loading-map {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        height: 100vh;
        position: fixed;
        top: 0px;
        right: 0px;
        width: 100vw;
      }
      .btn-geo {
        cursor: pointer;
      }
    `,
  ],
})
export class GeoPageComponent implements OnInit {
  geoLoc: [number, number] = [0, 0];
  marker!: Marker;
  constructor(private placesService: PlacesService) {}

  get isUserLocationReady() {
    // console.log(this.placesService.isUserLocationReady);
    return this.placesService.isUserLocationReady;
  }

  ngOnInit(): void {
    // this.geoLoc = this.placesService.userLocation!;
    this.placesService.getUserLocation().then((loc) => {
      this.geoLoc = loc;
      const map: Map = this.placesService.map;
      const popup = new Popup().setHTML(`
      <h6>Geolocalización</h6>
      <span>La ubicación por geolocalizacion marca cerca de este lugar</span>
      `);
      this.marker = new Marker({ color: 'red' })
        .setLngLat(this.geoLoc)
        .setPopup(popup)
        .addTo(map);

      map.flyTo({ center: this.geoLoc, zoom: 15, essential: true, speed: 2 });
    });
  }
  ngOnDestroy(): void {
    this.placesService.stopWatcherGeo();
    this.marker?.remove();
  }

  public goToGeo() {
    this.placesService.map.flyTo({
      center: this.geoLoc,
      zoom: 15,
      essential: true,
    });
  }
}
