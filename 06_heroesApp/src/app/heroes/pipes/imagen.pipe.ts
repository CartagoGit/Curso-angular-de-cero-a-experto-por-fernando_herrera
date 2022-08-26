import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'imagen',
  // pure: false,
})
export class ImagenPipe implements PipeTransform {
  constructor(private http: HttpClient) {}
  transform(heroe: Heroe): string {
    const errorImg = 'assets/no-image.png';
    if (!heroe.id && !heroe.alt_img) {
      return errorImg;
    } else if (heroe.alt_img) {
      return heroe.alt_img;
    } else {
      const url = `assets/heroes/${heroe.id}.jpg`;
      if (
        heroe.id &&
        (heroe.id.includes('marvel-') || heroe.id.includes('dc-'))
      )
        return url;
      else return errorImg;
    }
    // return heroe.id ? `assets/heroes/${heroe.id}.jpg` : 'assets/no-image.png';
  }
}
