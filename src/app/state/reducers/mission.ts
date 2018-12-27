import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Mission } from '@app/models';
import { missionActions } from '@app/state/actions';

export interface State extends EntityState<Mission> {
  selectedId: string | null;
  error: any;
}

export const missionAdapter: EntityAdapter<Mission> = createEntityAdapter<Mission>({
  selectId: (mission: Mission) => mission.id,
  sortComparer: false
});

export const initialState: State = {
  ...missionAdapter.getInitialState(),
  selectedId: null,
  error: null
};

export function reducer(state: State = initialState,
                        action: missionActions.MissionActions): State {
  switch ( action.type ) {
    // Add new
    case missionActions.MissionActionTypes.MISSION_CREATED:
      return missionAdapter.addOne(new Mission(action.payload as Mission), state);
    // Update one
    case missionActions.MissionActionTypes.MISSION_ARCHIVED:
    case missionActions.MissionActionTypes.MISSION_UPDATED:
      return missionAdapter.updateOne({ id: (<Mission>action.payload).id, changes: action.payload as Mission }, state);
    // remove one
    case missionActions.MissionActionTypes.MISSION_REMOVED:
      return missionAdapter.removeOne(action.payload.id, state);
    // Add all
    case missionActions.MissionActionTypes.GET_MISSIONS_SUCCESS:
      return missionAdapter.addAll((<Mission[]>action.payload).map(mission => new Mission(mission)), state);
    // Select/Unselect
    case missionActions.MissionActionTypes.SELECT:
      return { ...state, selectedId: action.payload as string };
    case missionActions.MissionActionTypes.UNSELECT:
      return { ...state, selectedId: null };
    // Set error
    case missionActions.MissionActionTypes.GET_MISSIONS_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const getSelectedId = (state: State ) => state.selectedId;
export const getError = (state: State ) => state.error;

export const {
  // select the array of case ids
  selectIds: getMissionIds,

  // select the dictionary of case entities
  selectEntities: getMissionEntities,

  // select the array of cases
  selectAll: getAllMissions,

  // select the total case count
  selectTotal: getMissionTotal
} = missionAdapter.getSelectors();

