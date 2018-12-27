import { environment } from '@env/environment.prod';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducer, MetaReducer } from '@ngrx/store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import { fromUser, State } from './reducers';

export * from './reducers';
export * from './actions';
export * from './effects';

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const params = route.params;
    return { url, params, queryParams };
  }
}

/**
 * localStorage sync defenition.
 * if you want your part of the store to be in sync with localStorage, this is how you do it.
 */
function userDeserializer(storedState: any): fromUser.State {
  let userState = { ...fromUser.initialState };
  if ( storedState ) {
    userState.token = storedState.token;
  } else {
    userState = { ...fromUser.initialState };
  }
  return userState;
}

function userSerializer(state: fromUser.State): any {
  return { token: state.token };
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [{ user: { serialize: userSerializer, deserialize: userDeserializer } }],
    rehydrate: true
  })(reducer);
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer, storeFreeze]
  : [localStorageSyncReducer];
