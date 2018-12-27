import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from '..';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromRouter from '@ngrx/router-store';
import * as fromUser from './user';
import * as fromLoader from './loader';
import * as fromSystem from './system';
import * as fromCase from './case';
import * as fromMission from './mission';
import * as fromSource from './source';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  loader: fromLoader.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromUser.State;
  system: fromSystem.State;
  cases: fromCase.State;
  missions: fromMission.State;
  sources: fromSource.State;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  loader: fromLoader.reducer,
  router: fromRouter.routerReducer,
  user: fromUser.reducer,
  system: fromSystem.reducer,
  cases: fromCase.reducer,
  missions: fromMission.reducer,
  sources: fromSource.reducer,
};

/**
 * Loader Reducers
 */
export const selectLoader = createFeatureSelector<fromLoader.State>('loader');
export const selectPendingRequests = createSelector(selectLoader, fromLoader.selectPendingRequests);
export const selectLoadingState = createSelector(selectLoader, fromLoader.selectLoadingState);

/**
 * User Reducers
 */
export const selectUser = createFeatureSelector<fromUser.State>('user');
export const selectUserId = createSelector(selectUser, fromUser.selectId);
export const selectUserToken = createSelector(selectUser, fromUser.selectToken);
export const selectUserName = createSelector(selectUser, fromUser.selectName);
export const selectUserRole = createSelector(selectUser, fromUser.selectRole);
export const selectUserCreatedAt = createSelector(selectUser, fromUser.selectCreatedAt);
export const selectUserUpdatedAt = createSelector(selectUser, fromUser.selectUpdatedAt);
export const selectUserLastLogin = createSelector(selectUser, fromUser.selectLastLogin);

/**
 * Navigation reducers
 */
export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const selectRouterParams = createSelector(selectRouter, (state) => state.state.params);
export const selectRouterQuery = createSelector(selectRouter, (state) => state.state.queryParams);
export const selectRouterUrl = createSelector(selectRouter, (state) => state.state.url);

/**
 * Navigation reducers
 */
export const selectSystem = createFeatureSelector<fromSystem.State>('system');
export const selectSystemAlerts = createSelector(selectSystem, fromSystem.selectAlerts);
export const selectSystemBattery = createSelector(selectSystem, fromSystem.selectBattery);
export const selectSystemInternet = createSelector(selectSystem, fromSystem.selectInternet);
export const selectSystemOperational = createSelector(selectSystem, fromSystem.selectOperational);
export const selectSystemRejects = createSelector(selectSystem, fromSystem.selectRejects);
export const selectSystemStorage = createSelector(selectSystem, fromSystem.selectStorage);
export const selectSystemTooltips = createSelector(selectSystem, fromSystem.selectTooltips);
export const selectSystemInterceptor = createSelector(selectSystem, fromSystem.selectInterceptor);
export const selectSystemError = createSelector(selectSystem, fromSystem.selectError);

/**
 * Cases selectors
 */
export const selectCasesState = createFeatureSelector<fromCase.State>('cases');
export const selectSelectedCaseId = createSelector(selectCasesState, fromCase.getSelectedId);
export const selectCaseError = createSelector(selectCasesState, fromCase.getError);
export const selectCaseEntities = createSelector(selectCasesState, fromCase.getCaseEntities);
export const selectCaseIds = createSelector(selectCasesState, fromCase.getCaseIds);
export const selectCases = createSelector(selectCasesState, fromCase.getAllCases);
export const selectActiveCases = createSelector(selectCases, (cases) => cases.filter(single => single.status === 'active'));
export const selectArchiveCases = createSelector(selectCases, (cases) => cases.filter(single => single.status === 'archived'));
export const selectCurrentCase = createSelector(selectSelectedCaseId, selectCases,
  (selectedId, cases) => cases.find(single => single.id === selectedId, res => res ? res : null));

/**
 * Missions selectors
 */
export const selectMissionsState = createFeatureSelector<fromMission.State>('missions');
export const selectSelectedMissionId = createSelector(selectMissionsState, fromMission.getSelectedId);
export const selectMissionError = createSelector(selectMissionsState, fromMission.getError);
export const selectMissionEntities = createSelector(selectMissionsState, fromMission.getMissionEntities);
export const selectMissionids = createSelector(selectMissionsState, fromMission.getMissionIds);
export const selectMissions = createSelector(selectMissionsState, fromMission.getAllMissions);
export const selectCurrentMission = createSelector(selectSelectedMissionId, selectMissions,
  (selectedId, missions) => missions.find(mission => mission.id === selectedId, res => res ? res : null));
export const selectActiveMission = createSelector(selectMissions,
  (missions) => missions ? missions.find(mission => mission.status === 'active', res => res ? res : null) : null);

/**
 * Sources selectors
 */
export const selectSourcesState = createFeatureSelector<fromSource.State>('sources');
export const selectSelectedSourceId = createSelector(selectSourcesState, fromSource.getSelectedId);
export const selectSourceError = createSelector(selectSourcesState, fromSource.getError);
export const selectSourceEntities = createSelector(selectSourcesState, fromSource.getSourceEntities);
export const selectSourceIds = createSelector(selectSourcesState, fromSource.getSourceIds);
export const selectSources = createSelector(selectSourcesState, fromSource.getAllSources);
export const selectCurrentSource = createSelector(selectSelectedSourceId, selectSources,
  (selectedId, devices) => devices.find(device => device.id === selectedId, res => res ? res : null));

/**
 * Combined selectors
 */
export const selectCurrentCaseMissions = createSelector(selectCurrentCase, selectMissions,
  (currentCase, missions) => missions.length > 0 && currentCase
    ? missions.filter(mission => currentCase.missionIds.includes(mission.id))
    : []);
export const selectCurrentMissionSources = createSelector(selectCurrentMission, selectSources,
  (currentMission, sources) => sources.length > 0 && currentMission
    ? sources.filter(source => currentMission.sourceIds.includes(source.id))
    : []);
export const selectActiveMissionSources = createSelector(selectActiveMission, selectSources,
  (activeMission, sources) => sources.length > 0 && activeMission
    ? sources.filter(source => activeMission.sourceIds.includes(source.id))
    : []);

export { fromLoader, fromUser, fromRouter, fromSystem, fromCase, fromMission, fromSource };
