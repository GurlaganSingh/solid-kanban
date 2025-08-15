export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
