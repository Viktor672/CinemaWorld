import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, throwError } from 'rxjs';

export const NotFoundHttpInterceptor: HttpInterceptorFn = (req, next) => {
  let router = inject(Router);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 404) {
      router.navigate(['/page-not-found']);
      return EMPTY;
    }

    return throwError(() => error);
  }));
};
