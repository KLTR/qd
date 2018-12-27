import { Action } from '@ngrx/store';
import { IUser } from '@app/models/user';

export const UserActionTypes = {
  GET_INFO: '[User] Get User Info',
  LOGIN: '[User] Login',
  LOGIN_SUCCESS: '[User] Login Success',
  LOGIN_FAILED: '[User] Login Failed',
  SET_TOKEN: '[User] Set Token',
  LOGOUT: '[User] Logout'
};

export class GetInfo implements Action {
  readonly type = UserActionTypes.GET_INFO;

  constructor(public payload?: any) {
  }
}

export class Login implements Action {
  readonly type = UserActionTypes.LOGIN;

  constructor(public payload: { user: string, password: string }) {
  }
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = UserActionTypes.LOGOUT;

  constructor(public payload?: any) {
  }
}

export class SetToken implements Action {
  readonly type = UserActionTypes.SET_TOKEN;

  constructor(public payload: any) {
  }
}

export class LoginFail implements Action {
  readonly type = UserActionTypes.LOGIN_FAILED;

  constructor(public payload: any) {
  }
}

export type UserActions = Login | SetToken | LoginFail | GetInfo | LoginSuccess | Logout;
