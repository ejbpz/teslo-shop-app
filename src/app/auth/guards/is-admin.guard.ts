import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';
import { AuthService } from "../services/auth.service";

export const isAdminGuard: CanMatchFn = async (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  await firstValueFrom(authService.checkStatus());
  const isAdmin = authService.isAdmin();

  if(!isAdmin) {
    router.navigate(
      ['/auth'],
      {
        queryParams: {
          redirectTo: route.path ?? '/',
        },
      }
    );
    return false;
  }

  return true;
};
