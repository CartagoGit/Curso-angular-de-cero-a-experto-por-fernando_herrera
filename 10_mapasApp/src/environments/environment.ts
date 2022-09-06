// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapboxToken:
    'pk.eyJ1IjoiY2FydGFnb25vdmEiLCJhIjoiY2w3ajluZmx0MDV5ZzN2cXphZnE3b2ZkZCJ9.F0x5jxBxHQ5RJq01i1bNXA',
  mapboxApiUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
  mapboxApiFilters: `.json?proximity=ip&types=address%2Ccountry%2Cpostcode%2Cregion%2Cdistrict%2Cplace%2Clocality%2Cneighborhood%2Cpoi&language=es&access_token=`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
