import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { sourceActions, caseActions } from '@app/state/actions';
import { State } from '@app/state/reducers';
import { Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { catchError, map, mergeMap, switchMap, } from 'rxjs/operators';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class SourceEffects {

  @Effect()
  initSources$: Observable<Action> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.GET_CASES_SUCCESS))
    .pipe(
      map((action: sourceActions.GetSourcesSuccess) => action.payload),
      switchMap(sources => sources ? of(new sourceActions.GetSourcesSuccess(sources)) : Observable.throw('sources isn\'t in dashboard res')),
      catchError(err => of(new sourceActions.GetSourcesFailed(err)))
    );

  @Effect({dispatch: false})
  selectSources$: Observable<any> = this.actions$.pipe(ofType(sourceActions.SourceActionTypes.SELECT))
    .pipe(
      map((action: sourceActions.Select) => action.payload),
      mergeMap(sourceId => this.router.navigate(['cases/missions/sources', sourceId]))
    );

  constructor(private store: Store<State>,
              private actions$: Actions,
              private router: Router) {
  }
}
