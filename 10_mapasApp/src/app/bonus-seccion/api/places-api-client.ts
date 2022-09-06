import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

//CUSTOM HTTP
export class PlacesApiClient extends HttpClient {
  public baseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  public override get<T>(
    url: string,
    options?: {
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
    }
  ) {
    url = this.baseUrl + url;
    return super.get<T>(url, {
      params: {
        limit: 5,
        language: 'es',
        access_token: environment.mapboxToken,
        proximity: 'ip',
        types:
          'address,country,postcode,region,district,place,locality,neighborhood,poi',
        ...options?.params,
      },
    });
  }

  // mapboxToken:
  // 'pk.eyJ1IjoiY2FydGFnb25vdmEiLCJhIjoiY2w3ajluZmx0MDV5ZzN2cXphZnE3b2ZkZCJ9.F0x5jxBxHQ5RJq01i1bNXA',
  // mapboxApiUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  // mapboxApiFilters: `.json?proximity=ip&types=address%2Ccountry%2Cpostcode%2Cregion%2Cdistrict%2Cplace%2Clocality%2Cneighborhood%2Cpoi&language=es&access_token=`,
}
