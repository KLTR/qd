import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Source } from '@app/models';
import { sourceActions } from '@app/state/actions';

export interface State extends EntityState<Source> {
  selectedId: string | null;
  error: any;
}

export const sourceEntityAdapter: EntityAdapter<Source> = createEntityAdapter<Source>({
  selectId: (source: Source) => source.id,
  sortComparer: false
});

export const initialState: State = {
  ...sourceEntityAdapter.getInitialState(),
  selectedId: null,
  error: null
};

export function reducer(state: State = initialState,
                        action: sourceActions.SourceActions): State {
  switch ( action.type ) {
    // Add or Update one
    case sourceActions.SourceActionTypes.SOURCE_ACTIVE:
      return ((state.ids as Array<string>).indexOf((action.payload as Source).id) > -1)
        ? sourceEntityAdapter.updateOne({ id: (<Source>action.payload).id, changes: action.payload as Source }, state)
        : sourceEntityAdapter.addOne(new Source(action.payload as Source), state);
    // Add one
    case sourceActions.SourceActionTypes.SOURCE_CREATED:
      return sourceEntityAdapter.addOne(new Source(action.payload as Source), state);
    // Update one
    case sourceActions.SourceActionTypes.SOURCE_ARCHIVED:
    case sourceActions.SourceActionTypes.SOURCE_UPDATED:
      return sourceEntityAdapter.updateOne({ id: (<Source>action.payload).id, changes: action.payload as Source }, state);
    // Remove one
    case sourceActions.SourceActionTypes.SOURCE_REMOVED:
      return sourceEntityAdapter.removeOne((<Source>action.payload).id, state);
    // Add all
    case sourceActions.SourceActionTypes.GET_SOURCES_SUCCESS:
      return sourceEntityAdapter.addAll((<Source[]>action.payload).map(device => new Source(device)), state);
    // Select/Unselect
    case sourceActions.SourceActionTypes.SELECT:
      return { ...state, selectedId: action.payload as string };
    case sourceActions.SourceActionTypes.UNSELECT:
      return { ...state, selectedId: null };
    // Set error
    case sourceActions.SourceActionTypes.GET_SOURCES_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const getSelectedId = (state: State ) => state.selectedId;
export const getError = (state: State ) => state.error;

export const {
  // select the array of case ids
  selectIds: getSourceIds,

  // select the dictionary of case entities
  selectEntities: getSourceEntities,

  // select the array of cases
  selectAll: getAllSources,

  // select the total case count
  selectTotal: getSourceTotal
} = sourceEntityAdapter.getSelectors();
