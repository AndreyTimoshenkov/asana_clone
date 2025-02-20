import { createAction, props } from "@ngrx/store";

export const addAssignee = createAction(
  '[Assignee] Add Assignee',
  props<{ assignee: string }>()
);
