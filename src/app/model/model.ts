export interface ITask {
  title: string,
  description?: string,
  deadline: string,
  priority: TPriority,
  status: TStatus,
  assignee: string,
}

export type TPriority = "low" | "medium" | "high";

export type TStatus = "open" | "in progress" | "completed" | "postponed";


