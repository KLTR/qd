import { userActions } from '../actions';
import { User } from '@app/models';

export interface State extends User {
  error?: any;
}

export const initialState: State = {
  id: null,
  token: null,
  name: null,
  role: null,
  createdAt: null,
  lastLogin: null,
  updatedAt: null,
  error: null
};

export function reducer(state: State = initialState,
                        action: userActions.UserActions): State {
  switch ( action.type ) {
    case userActions.UserActionTypes.LOGIN:
      return { ...state };
    case userActions.UserActionTypes.SET_TOKEN:
    case userActions.UserActionTypes.LOGIN_SUCCESS:
      return { ...state, ...action.payload };
    case userActions.UserActionTypes.LOGIN_FAILED:
      return { ...state, error: action.payload };
    case userActions.UserActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}

export const selectError = (state: State) => state.error;
export const selectId = (state: State) => state.id;
export const selectToken = (state: State) => state.token;
export const selectName = (state: State) => state.name;
export const selectRole = (state: State) => state.role;
export const selectCreatedAt = (state: State) => state.createdAt;
export const selectUpdatedAt = (state: State) => state.updatedAt;
export const selectLastLogin = (state: State) => state.lastLogin;
