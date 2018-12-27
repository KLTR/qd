import { Action } from '@ngrx/store';
import { ISystemInfo } from '@app/models/system-info';

export const SystemActionTypes = {
  SYSTEM_STATUS: '[System] Update',
  SET_ERROR: '[System] Set Error',
  CLEAR_ERROR: '[System] Clear Error'
};

export class UpdateSystem implements Action {
  readonly type = SystemActionTypes.SYSTEM_STATUS;

  constructor(public payload: ISystemInfo) {
  }
}

export class SetError implements Action {
  readonly type = SystemActionTypes.SET_ERROR;

  constructor(public payload: any) {
  }
}

export class ClearError implements Action {
  readonly type = SystemActionTypes.CLEAR_ERROR;

  constructor(public payload: any) {
  }
}

export type SystemActions = UpdateSystem | SetError | ClearError;
