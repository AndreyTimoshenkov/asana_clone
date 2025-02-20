export interface AssigneeState {
  assignees: string[];
}

export const initialState: string[] = [
  'Ava Mitchell',
  'Daniel Hayes',
  'Jacob Foster',
  'Liam Carter',
  'Sophia Reynolds',
  'Ethan Brooks',
  'Olivia Bennett'
];

export function assigneeReducer(state = initialState, action: any): string[] {
  switch (action.type) {
    case '[Assignee] Add Assignee':
      return [...state, action.assignee];
    default:
      return state;
  }
}
