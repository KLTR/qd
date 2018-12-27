import { Action } from '@ngrx/store';
import { IMission, Mission } from '@app/models';

export const MissionActionTypes = {
  GET_MISSIONS_SUCCESS: '[Missions] Get All Missions Success',
  GET_MISSIONS_FAIL: '[Missions] Get All Missions Failed',
  ARCHIVE_MISSION: '[Missions] Archive Mission',
  CREATE_MISSION: '[Missions] Create Mission',
  UPDATE_MISSION: '[Missions] Update Mission',
  REMOVE_MISSION: '[Missions] Delete Mission',
  STOP_MISSION: '[Missions] Stop Active Mission',
  SELECT: '[Missions] Select Mission',
  UNSELECT: '[Missions] Clear Selected Mission',
  MISSION_CREATED: '[Missions] Mission Created',
  MISSION_REMOVED: '[Missions] Mission Removed',
  MISSION_UPDATED: '[Missions] Mission Updated',
  MISSION_ARCHIVED: '[Missions] Mission Archived'
};

export class GetMissionsSuccess implements Action {
  readonly type = MissionActionTypes.GET_MISSIONS_SUCCESS;

  constructor(public payload: Mission[]) {
  }
}

export class GetMissionsFailed implements Action {
  readonly type = MissionActionTypes.GET_MISSIONS_FAIL;

  constructor(public payload: string) {
  }
}

export class ArchiveMission implements Action {
  readonly type = MissionActionTypes.ARCHIVE_MISSION;

  constructor(public payload: Mission) {
  }
}

export class CreateMission implements Action {
  readonly type = MissionActionTypes.CREATE_MISSION;

  constructor(public payload: IMission) {
  }
}

export class UpdateMission implements Action {
  readonly type = MissionActionTypes.UPDATE_MISSION;

  constructor(public payload: Mission) {
  }
}

export class RemoveMission implements Action {
  readonly type = MissionActionTypes.REMOVE_MISSION;

  constructor(public payload: Mission) {
  }
}

export class StopMission implements Action {
  readonly type = MissionActionTypes.STOP_MISSION;

  constructor(public payload?: any) {
  }
}

export class Select implements Action {
  readonly type = MissionActionTypes.SELECT;

  constructor(public payload: string) {
  }
}

export class Unselect implements Action {
  readonly type = MissionActionTypes.UNSELECT;

  constructor(public payload: void = null) {
  }
}

export class MissionCreated implements Action {
  readonly type = MissionActionTypes.MISSION_CREATED;

  constructor(public payload: Mission) {
  }
}

export class MissionUpdated implements Action {
  readonly type = MissionActionTypes.MISSION_UPDATED;

  constructor(public payload: Mission) {
  }
}

export class MissionRemoved implements Action {
  readonly type = MissionActionTypes.MISSION_REMOVED;

  constructor(public payload: string) {
  }
}

export class MissionArchived implements Action {
  readonly type = MissionActionTypes.MISSION_ARCHIVED;

  constructor(public payload: Mission) {
  }
}

export type MissionActions
  = GetMissionsSuccess | GetMissionsFailed
  | ArchiveMission | CreateMission | UpdateMission | RemoveMission | StopMission | Select | Unselect | MissionArchived | MissionCreated | MissionUpdated | MissionRemoved;
