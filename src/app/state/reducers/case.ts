import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Case } from '@app/models';
import { caseActions } from '@app/state/actions';

export interface State extends EntityState<Case> {
  selectedId: string;
  error: any;
}

export const caseAdapter: EntityAdapter<Case> = createEntityAdapter<Case>({
  selectId: (currCase: Case) => currCase.id,
  sortComparer: false
});

export const initialState: State = {
  ...caseAdapter.getInitialState(),
  selectedId: null,
  error: null
};

export function reducer(state: State = initialState,
                        action: caseActions.CaseActions): State {
  switch ( action.type ) {
    // Add new
    case caseActions.CaseActionTypes.CASE_CREATED:
      return caseAdapter.addOne(new Case(action.payload as Case), state);
    // Update one
    case caseActions.CaseActionTypes.CASE_ARCHIVED:
    case caseActions.CaseActionTypes.CASE_UPDATED:
      return caseAdapter.updateOne({ id: (<Case>action.payload).id, changes: action.payload as Case }, state);
    // remove one
    case caseActions.CaseActionTypes.CASE_REMOVED:
      return caseAdapter.removeOne(action.payload.id, state);
    // Add all
    case caseActions.CaseActionTypes.GET_CASES_SUCCESS:
      return caseAdapter.addAll((<{cases: Case[]}>action.payload).cases.map(singleCase => new Case(singleCase)), state);
    // Select/Unselect
    case caseActions.CaseActionTypes.SELECT:
      return { ...state, selectedId: action.payload as string };
    case caseActions.CaseActionTypes.UNSELECT:
      return { ...state, selectedId: null };
    // Set error
    case caseActions.CaseActionTypes.GET_CASES_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const getSelectedId = (state: State ) => state.selectedId;
export const getError = (state: State ) => state.error;

export const {
  // select the array of case ids
  selectIds: getCaseIds,

  // select the dictionary of case entities
  selectEntities: getCaseEntities,

  // select the array of cases
  selectAll: getAllCases,

  // select the total case count
  selectTotal: getCaseTotal
} = caseAdapter.getSelectors();


