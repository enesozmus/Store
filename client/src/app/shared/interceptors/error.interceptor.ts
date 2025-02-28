import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
        // alert(err.error.title || err.error);
        toastr.error(err.error.detail, err.error.title || err.error, {
          progressBar: true,
          timeOut: 5000,
        });
        // console.log(err.error);
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
        router.navigateByUrl('/server-error');
      }
      return throwError(() => err);
    })
  );
};
