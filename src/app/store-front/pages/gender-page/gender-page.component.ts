import { ProductsService } from '@/products/services/products.service';
import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from "@products/components/product-card/product-card.component";
import { PaginationComponent } from "@shared/components/pagination/pagination.component";
import { PaginationService } from '@shared/components/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [TitleCasePipe, ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export default class GenderPageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  gender = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((param) => param['gender'])
    )
  );

  productsResource = rxResource({
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1
    }),
    loader: ({request}) => this.productsService.getProducts({
      gender: request.gender,
      offset: request.page * 12
    })
  })
}
