import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { missionActions, caseActions, sourceActions } from '@app/state/actions';
import { State } from '@app/state/reducers';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
export class MissionEffects {

  @Effect()
  getMissions$: Observable<Action> = this.actions$.pipe(ofType(caseActions.CaseActionTypes.GET_CASES_SUCCESS))
    .pipe(
      map((action: caseActions.GetCasesSuccess) => action.payload.missions),
      switchMap(missions => missions ? of(new missionActions.GetMissionsSuccess(missions)) : Observable.throw('missions isn\'t in dashboard res')),
      catchError(err => of(new missionActions.GetMissionsFailed(err)))
    );

  @Effect({dispatch: false})
  addMission$: Observable<any> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.CREATE_MISSION))
    .pipe(
      map((action: missionActions.CreateMission) => action.payload),
      tap( () => console.log('need to implement in mission effects'))
      // mergeMap(payload => this.http.addMission(payload))
    );

  @Effect()
  selectMission$: Observable<Action> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.SELECT))
    .pipe(
      map((action: missionActions.Select) => action.payload),
      map(() => new sourceActions.Unselect())
    );

  @Effect()
  unselectMission$: Observable<Action> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.UNSELECT))
    .pipe(
      map(() => new sourceActions.Unselect())
    );

  @Effect({dispatch: false})
  editMission$: Observable<any> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.UPDATE_MISSION))
    .pipe(
      map((action: missionActions.UpdateMission) => action.payload),
      // switchMap(payload => this.http.editMission(payload.id, payload))
      tap( () => console.log('need to implement in mission effects'))

    );

    // End mission
  @Effect({dispatch: false})
  stopActiveMission$: Observable<any> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.STOP_MISSION))
    .pipe(
      // switchMap(() => this.http.stopActiveMission()
            tap( () => console.log('need to implement in mission effects')
    ));
    // Archive mission
  @Effect()
  archiveMission$: Observable<Action> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.ARCHIVE_MISSION))
    .pipe(
      // map( (action: missionActions.ArchiveMission) => action.payload),
      // switchMap(payload => this.http.archiveMission(payload.id).pipe(
      //   map(() => this.router.navigate(['cases', payload.caseId]))
      // )),
      tap( () => console.log('need to implement in mission effects'))

      // map(() => new missionActions.Unselect()),
    );

  @Effect({dispatch: false})
  deleteMission$: Observable<any> = this.actions$.pipe(ofType(missionActions.MissionActionTypes.REMOVE_MISSION))
    .pipe(
      map((action: missionActions.RemoveMission) => action.payload),
      tap( () => console.log('need to implement in mission effect'))
      // switchMap(mission => this.http.deleteMission(mission.id).pipe(
      //   map(() => this.router.navigate(['cases', mission.caseId]))
      // )),
    );

  constructor(private store: Store<State>,
              private actions$: Actions,
              private router: Router,
              private http: HttpService) {
  }
}
