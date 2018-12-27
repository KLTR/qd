import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { caseActions, missionActions } from '@app/state/actions';
import { State } from '@app/state/reducers';
import { Observable} from 'rxjs/';
import { map, mergeMap, tap} from 'rxjs/operators';
import { HttpService } from '@app/services/http/http.service';
import { Router } from '@angular/router';

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
export class CaseEffects {

  @Effect()
  initCases$: Observable<Action> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.INIT_DASHBOARD))
    .pipe(
      // switchMap(() => this.http.getDashboard().pipe(
      //     map((res: { sources: Source[], cases: Case[], missions: Mission[] }) => new caseActions.GetCasesSuccess(res)),
      //     catchError(err => of(new caseActions.GetCasesFailed(err)))
      //   )
      // )
    );

  @Effect({dispatch: false})
  addCase$: Observable<any> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.CREATE_CASE))
    .pipe(
      map((action: caseActions.CreateCase ) => action.payload),
      tap( () => console.log('need to implemetn in case effets'))

      // mergeMap(payload => this.http.addCase(payload))
    );

  @Effect({dispatch: false})
  selectCase$: Observable<any> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.SELECT))
    .pipe(
      map((action: caseActions.Select ) => action.payload),
      mergeMap(caseId => this.router.navigate(['cases', caseId]))
    );

  @Effect()
  unselectCase$: Observable<Action> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.UNSELECT))
    .pipe(
      map(() => new missionActions.Unselect())
    );

  @Effect({dispatch: false})
  updateCase$: Observable<any> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.UPDATE_CASE))
    .pipe(
      map((action: caseActions.UpdateCase ) => action.payload),
      tap( () => console.log('need to implemetn in case effets'))

      // mergeMap(payload => this.http.editCase(payload.id, payload))
    );

  @Effect({dispatch: false})
  archiveCase$: Observable<any> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.ARCHIVE_CASE))
    .pipe(
      map( (action: caseActions.ArchiveCase ) => action.payload),
      tap( () => console.log('need to implemetn in case effets'))

      // mergeMap(payload => this.http.archiveCase(payload))
    );

  @Effect({dispatch: false})
  deleteCase$: Observable<any> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.REMOVE_CASE))
    .pipe(
      map((action: caseActions.RemoveCase ) => action.payload),
      tap( () => console.log('need to implemetn in case effets'))
      // mergeMap(id => this.http.deleteCase(id).pipe(
        // map(() => this.router.navigate(['cases']))
      // ))
    );

  constructor(private store: Store<State>,
              private router: Router,
              private actions$: Actions,
              private http: HttpService) {
  }
}
