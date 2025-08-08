import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  let accessToken = authService.currentUser()?.accessToken;
  console.log(accessToken);
  
  if(accessToken){
  let authRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'X-Authorization': `${accessToken}`
    }
  });
  return next(authRequest);
}

return next(req);
};
