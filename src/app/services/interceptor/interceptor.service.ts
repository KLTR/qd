import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepting');
    const token: string = this.getToken();
    console.log(request);
    if (token && !request.headers.has('authorization') && !request.url.includes('logout')) {
      request = request.clone({
        setHeaders: {
          authorization: this.getToken()
        }
      });
    }

    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Unauthorized
        if (error.status === 401 || error.status === 403) {
          if (error.error.code === 16) {
            // Unable to parse token
            localStorage.clear();
            this.router.navigate(['login']);
            const err = {
              title: 'Inavlid token',
              msg: 'Unable to parse token'
            };
            this.toastr.error(err.msg, err.title);
            return throwError(error);
          }
          const err = {
            title: 'Unauthorized request',
            msg: 'User have no permissions'
          };
          this.toastr.info(err.msg, err.title);
        }
        if (error.status === 404 && error.error.code === 5) {
          const err = {
            title: `${error.statusText}`,
            msg: `${error.error.message}`
          };
          this.toastr.error(err.msg, err.title);
        }
        // Any other server error response
        // else {
        //   this.toastr.error(error.statusText, error.status.toString());
        return throwError(error);
        // }
      })
    );
  }

  getToken(): any {
    const token = localStorage.getItem('user');
    console.log(token);
    return token;
  }
}
