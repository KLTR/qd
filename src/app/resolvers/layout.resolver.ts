
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {HttpService} from '../services/http/http.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '@app/state/reducers';
import {systemActions, userActions} from '@app/state/actions';
import {catchError, map,  tap} from 'rxjs/operators';
import {AuthService} from '@app/services'
@Injectable()
export class LayoutResolver implements Resolve<any> {

  constructor(private httpService: HttpService, private store: Store<State>, private auth: AuthService) {
  }
  resolve(): any {
    this.httpService.getDashboard().pipe(
      catchError(err => of({})),
      map((data: any) => {
      this.store.dispatch(new systemActions.UpdateSystem(data));
      this.store.dispatch(new userActions.GetInfo(data.user))
    })
  ).subscribe()
     
  }
}

