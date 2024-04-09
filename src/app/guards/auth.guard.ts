//front/src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
