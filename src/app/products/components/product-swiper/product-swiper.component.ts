import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';

@Component({
  selector: 'product-swiper',
  imports: [ProductImagePipe],
  templateUrl: './product-swiper.component.html',
})
export class ProductSwiperComponent implements AfterViewInit {
  images = input.required<string[]>();

  swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if(!element) return;

    const swiper = new Swiper(element, {
      modules: [
        Navigation,
        Pagination
      ],

      direction: 'horizontal',
      loop: true,

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
