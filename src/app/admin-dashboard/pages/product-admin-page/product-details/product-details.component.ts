import { Product } from '@/products/interfaces/product-response.interface';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductSwiperComponent } from "@products/components/product-swiper/product-swiper.component";
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabelComponent } from "@shared/components/form-error-label/form-error-label.component";
import { ProductsService } from '@/products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductSwiperComponent, ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  productsService = inject(ProductsService);

  product = input.required<Product>();

  wasSaved = signal(false);
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  productForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    slug: ['',
      [
        Validators.required,
        Validators.pattern(FormUtils.slugPattern)
      ]
    ],
    description: ['', [Validators.required]],
    price: [0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],
    stock: [0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],
    gender: ['men',
      [
        Validators.required,
        Validators.pattern(/men|women|kid|unisex/)
      ]
    ],
    sizes: [['']],
    images: [['']],
    tags: [['']],
  });

  setFormValue(formLike: Partial<Product>) {
    // this.productForm.patchValue(formLike as any);
    this.productForm.reset(formLike as any);
    this.productForm.patchValue({tags: formLike.tags?.join(',')})
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if(currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1)
    } else {
      currentSizes.push(size)
    }

    this.productForm.patchValue({sizes: currentSizes});
  }

  async onSubmit() {
    if(this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),

      tags: formValue.tags
        ?.toLowerCase()
        .split(',')
        .map((tag: string) => tag.trim()) ?? []
    }

    if(this.product().id === 'new') {
      const product = await firstValueFrom(
        this.productsService.createProduct(productLike)
      );

      this.router.navigate(['/admin/product', product.id]);

      // this.productsService.createProduct(productLike).subscribe(
      //   (product) => this.router.navigate(['/admin/product', product.id])
      // );
    } else {
      await firstValueFrom(
        this.productsService.updateProduct(this.product().id, productLike)
      );
      // this.productsService.updateProduct(this.product().id, productLike).subscribe();
    }

    this.wasSaved.set(true);
    setTimeout(() => {
      this.wasSaved.set(false);
    }, 2000);
  }
}
