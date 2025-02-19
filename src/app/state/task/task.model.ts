import { TPriority, TStatus } from "../../model/model";

export interface ITask {
  title: string;
  description?: string;
  deadline: string | Date;
  priority: TPriority;
  status: TStatus;
  assignee: string;
}

export interface TaskState {
  tasks: ITask[];
}
