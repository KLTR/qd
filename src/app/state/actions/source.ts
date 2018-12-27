import { Action } from '@ngrx/store';
import { Source, ISource } from '@app/models';

export const SourceActionTypes = {
  GET_SOURCES_SUCCESS: '[Sources] Get All Sources Success',
  GET_SOURCES_FAIL: '[Sources] Get All Sources Failed',
  ARCHIVE_SOURCE: '[Sources] Archive Source',
  DISCONNECT_SOURCE: '[Sources] Disconnect Source',
  CREATE_SOURCE: '[Sources] Create Source',
  UPDATE_SOURCE: '[Sources] Update Source',
  SELECT: '[Sources] Select Source',
  UNSELECT: '[Sources] Clear Selected Source',
  SOURCE_CREATED: '[Sources] Source Created',
  SOURCE_ACTIVE: '[Sources] Source Active',
  SOURCE_UPDATED: '[Sources] Source Updated',
  SOURCE_REMOVED: '[Sources] Source Removed',
  SOURCE_ARCHIVED: '[Sources] Source Archived'
};

export class GetSourcesSuccess implements Action {
  readonly type = SourceActionTypes.GET_SOURCES_SUCCESS;

  constructor(public payload: Source[]) {
  }
}

export class GetSourcesFailed implements Action {
  readonly type = SourceActionTypes.GET_SOURCES_FAIL;

  constructor(public payload: string) {
  }
}

export class ArchiveSource implements Action {
  readonly type = SourceActionTypes.ARCHIVE_SOURCE;

  constructor(public payload: string) {
  }
}

export class DisconnectSource implements Action {
  readonly type = SourceActionTypes.DISCONNECT_SOURCE;

  constructor(public payload: string) {
  }
}

export class CreateSource implements Action {
  readonly type = SourceActionTypes.CREATE_SOURCE;

  constructor(public payload: { SourceId: string, caseIds: string[] }) {
  }
}

export class UpdateSource implements Action {
  readonly type = SourceActionTypes.UPDATE_SOURCE;

  constructor(public payload: Source) {
  }
}

export class Select implements Action {
  readonly type = SourceActionTypes.SELECT;

  constructor(public payload: string) {
  }
}

export class Unselect implements Action {
  readonly type = SourceActionTypes.UNSELECT;

  constructor(public payload: void = null) {
  }
}

export class SourceCreated implements Action {
  readonly type = SourceActionTypes.SOURCE_CREATED;

  constructor(public payload: Source) {
  }
}

export class SourceActive implements Action {
  readonly type = SourceActionTypes.SOURCE_ACTIVE;

  constructor(public payload: Source) {
  }
}

export class SourceUpdated implements Action {
  readonly type = SourceActionTypes.SOURCE_UPDATED;

  constructor(public payload: Source) {
  }
}

export class SourceArchived implements Action {
  readonly type = SourceActionTypes.SOURCE_ARCHIVED;

  constructor(public payload: Source) {
  }
}

export class SourceRemoved implements Action {
  readonly type = SourceActionTypes.SOURCE_REMOVED;

  constructor(public payload: Source) {
  }
}

export type SourceActions
  = GetSourcesSuccess | GetSourcesFailed
  | ArchiveSource | DisconnectSource | CreateSource | UpdateSource | Select | Unselect | SourceArchived | SourceCreated | SourceActive | SourceUpdated | SourceRemoved;
