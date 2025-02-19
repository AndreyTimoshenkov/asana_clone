import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ITask } from "./task.model";

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
    'Add Task': props<{ task: ITask }>(),
    'Remove Task': props<{ title: string }>(),
    'Load Tasks': props<{ tasks: ITask[] }>(),
    'Clear Tasks': emptyProps(),
  },
});


