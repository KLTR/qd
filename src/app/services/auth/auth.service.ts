import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromUser, selectUser, userActions } from '@app/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../http/http.service';

@Injectable()
export class AuthService {
  public user$: Observable<fromUser.State> = this.store.select(selectUser);

  constructor(
    private store: Store<fromUser.State>,
    private http: HttpService) {
  }

  get token$(): Observable<string> {
    return this.user$.pipe(
      map((user) => {
         return user.token;
      })
    );
  }

  get error$(): Observable<string> {
    return this.user$.pipe(
      map(user => user.error)
    );
  }

  get role$(): Observable<string> {
    return this.user$.pipe(
      map(user => user.role)
    );
  }

  get isSignedIn$(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user.token)
    );
  }

  logout(): void {
    this.http.logout().subscribe()
    this.store.dispatch(new userActions.Logout());
  }

  login(credentials: { user: string, password: string }): void {
    this.store.dispatch(new userActions.Login(credentials));
    this.http.setToken()
  }


}
