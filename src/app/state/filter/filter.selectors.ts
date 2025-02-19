import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FilterState } from './filter.model';

export const selectFilterState = createFeatureSelector<FilterState>('filters');

export const selectAssigneeFilter = createSelector(
  selectFilterState,
  (state) => state.assignee
);

export const selectDeadlineFilter = createSelector(
  selectFilterState,
  (state) => state.deadline
);

export const selectPriorityFilter = createSelector(
  selectFilterState,
  (state) => state.priority
);

export const selectStatusFilter = createSelector(
  selectFilterState,
  (state) => state.status
);

export const selectAllFilters = createSelector(
  selectAssigneeFilter,
  selectDeadlineFilter,
  selectPriorityFilter,
  selectStatusFilter,
  (assignee, deadline, priority, status) => ({
    assignee,
    deadline,
    priority,
    status,
  })
);
