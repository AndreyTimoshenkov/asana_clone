import { createReducer, on } from '@ngrx/store';
import { FilterActions } from "./filter.actions";
import { initialFilterState } from "./filter.model";

export const filterReducer = createReducer(
  initialFilterState,
  on(FilterActions.setFilter, (state, { filterType, value }) => ({
    ...state,
    [filterType]: value,
  })),
  on(FilterActions.clearFilter, (state, { filterType }) => ({
    ...state,
    [filterType]: null,
  })),
  on(FilterActions.clearAllFilters, () => initialFilterState)
);
