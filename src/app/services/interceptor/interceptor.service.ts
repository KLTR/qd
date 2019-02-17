import {
  Injectable
} from '@angular/core';
import {
  ToastrService
} from 'ngx-toastr';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Observable,
  throwError
} from 'rxjs';
import {
  map,
  catchError
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    // const token: string = localStorage.getItem('token');

    // if (token) {
    //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }

    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Unauthorized
        if (error.status === 401 || error.status === 403) {
          let err = {
            title: "Unauthorized request",
            msg: "User have no permissions"
          };
          this.toastr.info(err.title, err.msg);
        }
        // Any other server error response 
        // else {
        //   this.toastr.error(error.statusText, error.status.toString());
        return throwError(error);
        // }
      }));
  }


}
