import * as userActions from './user';
import * as loaderActions from './loader';
import * as systemActions from './system';
import * as caseActions from './case';
import * as missionActions from './mission';
import * as sourceActions from './source';
import { Action } from '@ngrx/store';

export class GlobalAction implements Action {
  readonly type;

  constructor(type: string, public payload: any) {
    this.type = type;
  }
}

export const allActionTypes = {
  ...caseActions.CaseActionTypes,
  ...missionActions.MissionActionTypes,
  ...sourceActions.SourceActionTypes,
  ...userActions.UserActionTypes,
  ...systemActions.SystemActionTypes,
  ...loaderActions.LoaderActionTypes
};

export { userActions, loaderActions, systemActions, caseActions, missionActions, sourceActions };
