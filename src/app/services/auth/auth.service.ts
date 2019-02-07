import { Router } from '@angular/router';
import {
  Injectable
} from '@angular/core';
import {
  map, tap
} from 'rxjs/operators';
import {
  HttpService
} from '../http/http.service';

@Injectable()
export class AuthService {
  public user:any ;
  public isSignedIn: boolean;
  constructor(
    private router: Router,
    private http: HttpService) {

    }

  logout(): void {
    this.http.logout().subscribe()
    // this.store.dispatch(new userActions.Logout());
  }

  login(credentials: {
    user: string,
    password: string
  }): void {
    // this.store.dispatch(new userActions.Login(credentials));
    this.http.login(credentials).pipe(
      tap(token => localStorage.setItem('token', token.token)),
      map(token => token.swagger_ui),
      tap(token => localStorage.setItem('user', token)),
    ).subscribe(res => {this.isSignedIn = true, this.router.navigate(['/activeMission'])})
  }


}
