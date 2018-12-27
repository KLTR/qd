import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { loaderActions } from '@app/state/actions';
import { fromLoader, selectLoader } from '@app/state/reducers';
import { Observable, of } from 'rxjs';
import { mergeMap,withLatestFrom } from 'rxjs/operators';

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
export class LoaderEffects {

  @Effect()
  clearLoading$: Observable<Action> = this.actions$.pipe(ofType(loaderActions.LoaderActionTypes.DEL_REQUEST))
    .pipe(
      withLatestFrom(this.store.select(selectLoader)),
      mergeMap(([, loader]) => {
        if ( loader.loading && loader.pendingRequests.length === 0 ) {
          return of(new loaderActions.ClearLoader());
        }
        return Observable.create();
      })
    );

  constructor(private store: Store<fromLoader.State>,
              private actions$: Actions) {
  }
}
