import { TPriorityFilter, TStatusFilter } from "../../model/model";

export type TFilter = 'assignee' | 'deadline' | 'priority' | 'status';

export interface FilterState {
  assignee: string | null;
  deadline: Date | null;
  priority: TPriorityFilter;
  status: TStatusFilter;
}

export const initialFilterState: FilterState = {
  assignee: null,
  deadline: null,
  priority: null,
  status: null,
};
