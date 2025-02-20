import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectAssigneesState = createFeatureSelector<string[]>('assignees');

export const selectAllAssignees = createSelector(
  selectAssigneesState,
  (state: string[]) => state
);
