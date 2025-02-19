import { createReducer, on } from '@ngrx/store';
import { initialFilterState } from "./mock-filter.data";
import { FilterActions } from "./filter.actions";

export const filterReducer = createReducer(
  initialFilterState,
  on(FilterActions.setFilter, (state, { filterType, value }) => ({
    ...state,
    [filterType]: value
  })),
  on(FilterActions.clearFilter, (state, { filterType }) => ({
    ...state,
    [filterType]: null
  })),
  on(FilterActions.clearAllFilters, () => initialFilterState)
);
