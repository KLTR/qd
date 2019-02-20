import {
  WsService
} from './../websocket/ws.service';
import {
  Router
} from '@angular/router';
import {
  Injectable
} from '@angular/core';
import {
  map,
  tap
} from 'rxjs/operators';
import {
  HttpService
} from '../http/http.service';

@Injectable()
export class AuthService {
  public user: any;
  public isSignedIn: boolean;
  constructor(
    private router: Router,
    private http: HttpService,
    private ws: WsService) {}

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
    this.ws.close();
    this.http.logout().subscribe(res => {
      console.log(res);
    })
  }

  login(credentials: {
    user: string,
    password: string
  }): void {
    this.http.login(credentials).pipe(
      tap(token => localStorage.setItem('token', token.token)),
      map(token => token.swagger_ui),
      tap(token => localStorage.setItem('user', token)),
    ).subscribe(res => {
      this.isSignedIn = true;
      this.ws.open();
      this.router.navigate(['/dashboard']);
    })
  }

}
