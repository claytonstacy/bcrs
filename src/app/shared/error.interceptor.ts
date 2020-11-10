/******************************************************************************
 * Title: error.interceptor.ts
 * Author: Clayton Stacy
 * Modified by:
 * Date: 10/28/2020
 * Description: Interceptor to redirect 404 and 500
 *****************************************************************************/

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if ([404].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/404']);
      }
      if ([500].indexOf(err.status) !== -1) {
        this.router.navigate(['/session/500']);
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
