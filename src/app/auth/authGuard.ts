import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('jwtToken');
  const router = inject(Router);

  if(token) {
    return true;

  } else {
    router.navigate(['login']);
    console.log('Unauthorized path.')
    return false;
  }
};
