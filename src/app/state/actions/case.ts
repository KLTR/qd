import { Action } from '@ngrx/store';
import { Case, ICase, Mission, Source } from '@app/models';

export const CaseActionTypes = {
  INIT_DASHBOARD: '[Cases] Init Dashboard',
  GET_CASES_SUCCESS: '[Cases] Get All Cases Success',
  GET_CASES_FAIL: '[Cases] Get All Cases Failed',
  ARCHIVE_CASE: '[Cases] Archive Case',
  CREATE_CASE: '[Cases] Create Case',
  UPDATE_CASE: '[Cases] Update Case',
  REMOVE_CASE: '[Cases] Remove Case',
  SELECT: '[Cases] Select Case',
  UNSELECT: '[Cases] Clear Selected Case',
  CASE_CREATED: '[Cases] Case Created',
  CASE_REMOVED: '[Cases] Case Removed',
  CASE_UPDATED: '[Cases] Case Updated',
  CASE_ARCHIVED: '[Cases] Case Archived'
};

export class InitDashboard implements Action {
  readonly type = CaseActionTypes.INIT_DASHBOARD;

  constructor(public payload: any = null) {
  }
}

export class GetCasesSuccess implements Action {
  readonly type = CaseActionTypes.GET_CASES_SUCCESS;

  constructor(public payload: {sources: Source[], cases: Case[], missions: Mission[]}) {
  }
}

export class GetCasesFailed implements Action {
  readonly type = CaseActionTypes.GET_CASES_FAIL;

  constructor(public payload: string) {
  }
}

export class ArchiveCase implements Action {
  readonly type = CaseActionTypes.ARCHIVE_CASE;

  constructor(public payload: string) {
  }
}

export class CreateCase implements Action {
  readonly type = CaseActionTypes.CREATE_CASE;

  constructor(public payload: ICase) {
  }
}

export class UpdateCase implements Action {
  readonly type = CaseActionTypes.UPDATE_CASE;

  constructor(public payload: ICase) {
  }
}

export class RemoveCase implements Action {
  readonly type = CaseActionTypes.REMOVE_CASE;

  constructor(public payload: string) {
  }
}

export class Select implements Action {
  readonly type = CaseActionTypes.SELECT;

  constructor(public payload: string) {
  }
}

export class Unselect implements Action {
  readonly type = CaseActionTypes.UNSELECT;

  constructor(public payload: any = null) {
  }
}

export class CaseCreated implements Action {
  readonly type = CaseActionTypes.CASE_CREATED;

  constructor(public payload: Case) {
  }
}

export class CaseUpdated implements Action {
  readonly type = CaseActionTypes.CASE_UPDATED;

  constructor(public payload: Case) {
  }
}

export class CaseArchived implements Action {
  readonly type = CaseActionTypes.CASE_ARCHIVED;

  constructor(public payload: Case) {
  }
}

export class CaseRemoved implements Action {
  readonly type = CaseActionTypes.CASE_REMOVED;

  constructor(public payload: string) {
  }
}

export type CaseActions
  = InitDashboard | GetCasesSuccess | GetCasesFailed
  | ArchiveCase | CreateCase | UpdateCase | RemoveCase | Select | Unselect | CaseArchived | CaseCreated | CaseUpdated | CaseRemoved;
