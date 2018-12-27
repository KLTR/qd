import { Action } from '@ngrx/store';

export const LoaderActionTypes = {
  ADD_REQUEST: '[Loader] Add Request',
  DEL_REQUEST: '[Loader] Remove Request',
  RESET_LOADER: '[Loader] Reset Loader',
  START_LOADER: '[Loader] Start Loader',
  CLEAR_LOADER: '[Loader] Clear Loader',
  HTTP_SUCCESS: '[Dashboard] Http Request Success',
  HTTP_FAIL: '[Dashboard] Http Request Failed',
};

export class AddRequest implements Action {
  readonly type = LoaderActionTypes.ADD_REQUEST;

  constructor(public payload: string) {
  }
}

export class DelRequest implements Action {
  readonly type = LoaderActionTypes.DEL_REQUEST;

  constructor(public payload: string) {
  }
}

export class StartLoader implements Action {
  readonly type = LoaderActionTypes.START_LOADER;

  constructor(public payload?: any) {
  }
}

export class ClearLoader implements Action {
  readonly type = LoaderActionTypes.CLEAR_LOADER;

  constructor(public payload?: any) {
  }
}

export class ResetLoader implements Action {
  readonly type = LoaderActionTypes.RESET_LOADER;

  constructor(public payload?: any) {
  }
}

export class HttpSuccess implements Action {
  readonly type = LoaderActionTypes.HTTP_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class HttpFailed implements Action {
  readonly type = LoaderActionTypes.HTTP_FAIL;

  constructor(public payload?: any) {
  }
}

export type LoaderActions = AddRequest | DelRequest | StartLoader | ClearLoader | ResetLoader | HttpSuccess | HttpFailed;
