import { Component, OnInit } from '@angular/core';
import { ApiService, MapService } from '../../services';
import { Feature } from '../../interfaces/resultado-busqueda';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styles: [
    `
      .pointer {
        cursor: pointer;
      }
      p {
        font-size: 12px;
        margin-bottom: 2px;
      }
    `,
  ],
})
export class SearchResultsComponent implements OnInit {
  public selectedId: string = '';

  get isLoadingPlaces() {
    return this.apiService.isLoadingPlaces;
  }

  get places() {
    return this.apiService.places;
  }

  get colors() {
    return this.mapService.colorMarkers;
  }

  constructor(private apiService: ApiService, private mapService: MapService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.mapService.removeMarkers();
    this.apiService.removePlaces();
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat], 15);
  }
}
