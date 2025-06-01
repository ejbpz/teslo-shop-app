import { ProductsService } from '@/products/services/products.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductSwiperComponent } from "../../../products/components/product-swiper/product-swiper.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductSwiperComponent],
  templateUrl: './product-page.component.html',
})
export default class ProductPageComponent {
  productService = inject(ProductsService);
  route:string = inject(ActivatedRoute).snapshot.params['idSlug'];

  productResource = rxResource({
    request: () => ({param: this.route}),
    loader: ({request}) => this.productService.getProductByIdSlug(request.param)
  });
}
