import { ProductsService } from '@/products/services/products.service';
import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";

@Component({
  selector: 'app-gender-page',
  imports: [TitleCasePipe, ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export default class GenderPageComponent {
  productsService = inject(ProductsService);
  gender = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((param) => param['gender'])
    )
  );

  productsResource = rxResource({
    request: () => ({gender: this.gender()}),
    loader: ({request}) => this.productsService.getProducts({gender: request.gender})
  })
}
