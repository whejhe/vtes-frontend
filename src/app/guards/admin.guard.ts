import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  const currentUser = authSvc.getCurrentUser();
  if(currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' )){
    return true;
  }else{
    router.navigate(['/']);
    return false;
  }
};
