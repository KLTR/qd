import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
               if(localStorage.getItem('token')){
                 return true
               } else {
                  this.router.navigate(['login'])
               }
    // return this.auth.isSignedIn.pipe(
    //   tap(signedIn => !signedIn ? this.router.navigate(['/login'], { queryParams: { return: state.url } }) : signedIn)
    // );
  }
}


