import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {
  transform(value: null | string | string[]): string {
    if(value === null) {
      return './assets/images/no-image.jpg';
    }

    if (typeof value === 'string') {
      if(value.startsWith('blob')) {
        return value;
      }
      return `${environment.baseUrl}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return './assets/images/no-image.jpg';
    }

    return `${environment.baseUrl}/files/product/${image}`;
  }
}
