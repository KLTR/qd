import { systemActions } from '../actions/';
import { SystemInfo } from '@app/models/system-info';

export interface State extends SystemInfo {
  error?: any;
}

export const initialState: State = {
  alerts: null,
  battery: null,
  interceptor: null,
  internet: null,
  operational: null,
  rejects: null,
  storage: null,
  tooltips: null,
  error: null,
  goat: null,
  alice: null,
  cloudx: null,
  pioneer: null,
  user: null
};

export function reducer(state: State = initialState,
                        action: systemActions.SystemActions): State {
  switch ( action.type ) {
    case systemActions.SystemActionTypes.SYSTEM_STATUS:
      return { ...state, ...action.payload };
    case systemActions.SystemActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case systemActions.SystemActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}

export const selectAlerts = (state: State) => state.alerts;
export const selectBattery = (state: State) => state.battery;
export const selectInterceptor = (state: State) => state.interceptor;
export const selectInternet = (state: State) => state.internet;
export const selectOperational = (state: State) => state.operational;
export const selectRejects = (state: State) => state.rejects;
export const selectStorage = (state: State) => state.storage;
export const selectTooltips = (state: State) => state.tooltips;
export const selectError = (state: State) => state.error;
