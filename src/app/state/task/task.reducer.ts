import { createReducer, on } from "@ngrx/store";
import { TaskActions } from "./task.actions";
import { INITIAL_STATE } from "./mock.data";

export const taskReducer = createReducer(
  INITIAL_STATE,

  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),

  on(TaskActions.removeTask, (state, { title }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.title !== title)
  })),

  on(TaskActions.loadTasks, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks]
  })),

  on(TaskActions.clearTasks, () => ({
    tasks: []
  }))
);
