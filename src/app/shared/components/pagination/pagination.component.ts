import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  currentPage = input<number>(1);
  pages = input<number>(0);

  getPagesList = computed(() => {
    return Array.from({length: this.pages()}, (_, i) => i + 1);
  })
}
