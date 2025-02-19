import { TaskState } from './task.model';
import { createReducer, on } from "@ngrx/store";
import { addTask, loadTasks, removeTask } from "./task.actions";

const initialState: TaskState = {
  tasks: [
    {
      "title": "Design Homepage",
      "description": "Create wireframes and mockups for the homepage layout.",
      "deadline": "2023-11-15",
      "priority": "high",
      "status": "in progress",
      "assignee" : "Jacob Foster"
    },
    {
      "title": "Write API Documentation",
      "description": "Document the endpoints and usage of the REST API.",
      "deadline": "2023-11-20",
      "priority": "medium",
      "status": "open",
      "assignee" : "Liam Carter"
    },
    {
      "title": "Fix Login Bug",
      "description": "Resolve the issue where users cannot log in on mobile devices.",
      "deadline": "2023-11-10",
      "priority": "high",
      "status": "completed",
      "assignee" : "Sophia Reynolds"
    },
    {
      "title": "Plan Team Meeting",
      "description": "Schedule and prepare the agenda for the next team meeting.",
      "deadline": "2023-11-12",
      "priority": "low",
      "status": "postponed",
      "assignee" : "Daniel Hayes"
    },
    {
      "title": "Update Dependencies",
      "description": "Upgrade all project dependencies to their latest versions.",
      "deadline": "2023-11-18",
      "priority": "medium",
      "status": "open",
      "assignee" : "Ava Mitchell"
    },
    {
      "title": "Test Payment Gateway",
      "description": "Perform end-to-end testing of the new payment gateway integration.",
      "deadline": "2023-11-25",
      "priority": "high",
      "status": "in progress",
      "assignee" : "Ethan Brooks"
    },
    {
      "title": "Write Blog Post",
      "description": "Draft a blog post about the latest project updates.",
      "deadline": "2023-11-30",
      "priority": "low",
      "status": "open",
      "assignee" : "Olivia Bennett"
    }
  ]
};

export const taskReducer = createReducer(
  initialState,

  on(addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),

  on(removeTask, (state, { title }) => ({
    ...state,
    tasks: state.tasks.filter(task => task.title !== title)
  })),

  on(loadTasks, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks]
  }))
);
