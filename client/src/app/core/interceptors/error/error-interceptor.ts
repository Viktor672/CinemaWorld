import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);
  let toast = inject(ToastService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 404) {
      router.navigate(['/page-not-found']);
      toast.show('Page not found!', 'error');
    }
    else if (error.status!=403 && error.status != 409) {
      toast.show(error.message || error.error?.message || 'Unexpected error', 'error');
    }

    return throwError(() => error); 
  }));
};
