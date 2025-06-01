import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaginationService {
  currentPage = toSignal(
    inject(ActivatedRoute).queryParams.pipe(
      map((param) => param['page'] ? +param['page']! : 1),
      map((value) => isNaN(value) ? 1 : value)
    ),
    {
      initialValue: 1
    }
  )
}
