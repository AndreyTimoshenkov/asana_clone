import { createAction, props } from "@ngrx/store";
import { ITask } from "./task.model";

export const addTask = createAction('[Task] Add Task', props<{ task: ITask }>());
export const removeTask = createAction('[Task] Remove Task', props<{ title: string }>());
export const loadTasks = createAction('[Task] Load Tasks', props<{ tasks: ITask[] }>());
