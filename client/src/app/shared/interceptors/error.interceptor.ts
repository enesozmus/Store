import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      // console.log('🟥🟥', err);

      if (err.status === 400) {
        // alert(err.error.title || err.error);
        // console.log(err.error);
        if (err.error.errors) {
          const modelStateErrors = [];
          for (const key in err.error.errors) {
            if (err.error.errors[key]) {
              modelStateErrors.push(err.error.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        } else {
          toastr.error(err.error.detail, err.error.title || err.error, {
            progressBar: true,
            timeOut: 5000,
          });
        }
      }
      if (err.status === 401) {
        // alert(err.error.title || err.error);
        toastr.error(err.error.detail, err.error.title || err.error, {
          progressBar: true,
          timeOut: 5000,
        });
      }
      if (err.status === 403) {
        alert(err.error.title || err.error);
      }
      if (err.status === 404) {
        router.navigateByUrl('/not-found');
      }
      if (err.status === 500) {
        const navigationExtras: NavigationExtras = {state: {error: err.error}}
        router.navigateByUrl('/server-error', navigationExtras);
      }
      return throwError(() => err);
    })
  );
};
