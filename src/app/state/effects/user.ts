import { WebsocketService } from './../../services/websocket/websocket.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ROOT_EFFECTS_INIT, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpService } from '../../services/http/http.service';
import { userActions, loaderActions } from '@app/state/actions';
import { State, selectUserId, selectUserToken } from '@app/state/reducers';
import { Observable, of, Subscription, empty} from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom, } from 'rxjs/operators';


@Injectable()
export class UserEffects {
  private socketSub: Subscription;
  private returnUrl: string;

  @Effect()
  init$: Observable<Action> = this.actions$.pipe(ofType(ROOT_EFFECTS_INIT))
    .pipe(
      withLatestFrom(this.store.select(selectUserToken), this.store.select(selectUserId)),
      switchMap(([, token, id]) => (token && !id)
        ? of(new userActions.GetInfo())
        : empty())
    );

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(ofType(userActions.UserActionTypes.LOGIN))
    .pipe(
      map((action: userActions.Login) => action.payload),
      mergeMap(credentials => this.http.login(credentials).pipe(
        tap(token => this.store.dispatch(new userActions.SetToken({token: `Bearer ${token.token}`}))),
        map(() => new userActions.GetInfo()),
        catchError(err => of(new userActions.LoginFail(err.statusText)))
      ))
    );

  @Effect()
  logout$: Observable<Action> = this.actions$.pipe(ofType(userActions.UserActionTypes.LOGOUT))
    .pipe(
      switchMap(() => of(new loaderActions.ClearLoader())),
      tap(() => this.router.navigate(['/login'])),
      tap(() => this.socketSub ? this.socketSub.unsubscribe() : null)
    );

  @Effect()
  userInfo$: Observable<Action> = this.actions$.pipe(ofType(userActions.UserActionTypes.GET_INFO))
    .pipe(
      tap(() => this.socketSub = this.socket.connectSocket()),
      map((action: userActions.GetInfo) => action.payload),
      map(user => new userActions.LoginSuccess(user),
      catchError(err => of(new userActions.LoginFail(err)))
      ),
    );

  @Effect({ dispatch: false })
  navigateAfterLogin$: any = this.actions$.pipe(ofType(userActions.UserActionTypes.LOGIN_SUCCESS))
    .pipe(
      map(() => this.router.url.slice(0, 6)),
      map((url) => url === '/login' ? this.router.navigate([this.returnUrl]) : null),
  );

  constructor(private store: Store<State>,
    private router: Router,
    private actions$: Actions,
    private socket: WebsocketService,
    private http: HttpService) {
    this.router.routerState.root.queryParams.subscribe(query => this.returnUrl = query['return'] || 'activeMission');
  }
}
