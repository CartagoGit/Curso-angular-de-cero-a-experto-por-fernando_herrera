import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-screen',
  templateUrl: './map-screen.component.html',
  styles: [],
})
export class MapScreenComponent implements OnInit {
  get isUserLocationReady() {
    return this.placesService.isUserLocationReady;
  }

  constructor(private placesService: PlacesService) {}

  async ngOnInit() {}
}
