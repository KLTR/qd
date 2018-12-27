import { loaderActions } from '../actions';

export interface State {
  loading: boolean;
  pendingRequests: any[];
  error: any;
}

export const initialState: State = {
  loading: false,
  pendingRequests: [],
  error: null
};

export function reducer(state: State = initialState,
  action: loaderActions.LoaderActions): State {
  switch (action.type) {
    case loaderActions.LoaderActionTypes.ADD_REQUEST:
      return { ...state, loading: true, pendingRequests: [...state.pendingRequests, action.payload] };

    case loaderActions.LoaderActionTypes.DEL_REQUEST:
      const requests = [...state.pendingRequests];
      if (requests.length > 0) {
        const idx = requests.indexOf(action.payload);
        if (idx !== -1) {
          requests.splice(idx, 1);
        }
      }
      return { ...state, pendingRequests: requests };

    case loaderActions.LoaderActionTypes.START_LOADER:
      return { ...state, loading: true };

    case loaderActions.LoaderActionTypes.HTTP_FAIL:
      return { ...state, error: action.payload };

    case loaderActions.LoaderActionTypes.CLEAR_LOADER:
    case loaderActions.LoaderActionTypes.RESET_LOADER:
      return initialState;

    default:
      return state;
  }
}

export const selectPendingRequests = (state: State) => state.pendingRequests;
export const selectLoadingState = (state: State) => state.loading;
