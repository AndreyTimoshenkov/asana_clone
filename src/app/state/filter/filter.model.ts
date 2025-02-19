export type TFilter = 'assignee' | 'deadline' | 'priority' | 'status';

export interface FilterState {
  assignee: string | null;
  deadline: string | null;
  priority: string | null;
  status: string | null;
}
