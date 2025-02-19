import { FormControl } from "@angular/forms";

export interface ITask {
  title: string,
  description?: string,
  deadline: string | Date,
  priority: TPriority,
  status: TStatus,
  assignee: string,
}

export type TPriority = "low" | "medium" | "high";

export type TStatus = "open" | "in progress" | "completed" | "postponed";

export const ASSIGNEES = [
  'Ava Mitchell',
  'Daniel Hayes',
  'Jacob Foster',
  'Liam Carter',
  'Sophia Reynolds',
  'Ethan Brooks',
  'Olivia Bennett'
]

export interface ITaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  deadline: FormControl<Date | null>;
  priority: FormControl<'low' | 'medium' | 'high'>;
  status: FormControl<'open' | 'in progress' | 'completed' | 'postponed'>;
  assignee: FormControl<string>;
}

export interface ITaskCreation {
  success: boolean;
  task: ITask | null;
}
