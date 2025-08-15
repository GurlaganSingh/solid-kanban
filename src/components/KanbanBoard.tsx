import { createSignal } from 'solid-js';
import { Column as IColumn, Task } from '../types';
import KanbanColumn from './KanbanColumn';

const initial: IColumn[] = [
  { id: 'todo', title: 'To Do', tasks: [
      { id: 1, title: 'Design System Updates', description: 'Update the design system components to match new brand guidelines', priority: 'high', assignee: 'Sarah M.' },
      { id: 2, title: 'User Research Analysis', description: 'Analyze user feedback from recent surveys and interviews', priority: 'medium', assignee: 'Mike R.' },
      { id: 3, title: 'Database Optimization', description: 'Optimize database queries for better performance', priority: 'low', assignee: 'Alex K.' }
  ]},
  { id: 'inprogress', title: 'In Progress', tasks: [
      { id: 4, title: 'API Integration', description: 'Integrate third-party payment gateway API', priority: 'high', assignee: 'Emma L.' },
      { id: 5, title: 'Mobile App Testing', description: 'Test mobile application across different devices', priority: 'medium', assignee: 'David P.' }
  ]},
  { id: 'review', title: 'Review', tasks: [
      { id: 6, title: 'Code Review - Auth Module', description: 'Review authentication module implementation', priority: 'high', assignee: 'Lisa W.' }
  ]},
  { id: 'done', title: 'Done', tasks: [
      { id: 7, title: 'Homepage Redesign', description: 'Complete redesign of the company homepage', priority: 'high', assignee: 'John D.' },
      { id: 8, title: 'Documentation Update', description: 'Update API documentation with latest changes', priority: 'low', assignee: 'Anna S.' }
  ]}
];

export default function KanbanBoard() {
  const [columns, setColumns] = createSignal<IColumn[]>(initial);

  const moveTask = (fromCol: number, fromIdx: number, toCol: number, toIdx?: number) => {
    setColumns(prev => {
      const next = [...prev];
      const [task] = next[fromCol].tasks.splice(fromIdx, 1);
      next[toCol].tasks.splice(toIdx ?? next[toCol].tasks.length, 0, task);
      return next;
    });
  };

  const addTask = (colIdx: number, task: Task) => {
    setColumns(prev => {
      const next = [...prev];
      next[colIdx].tasks.push(task);
      return next;
    });
  };

  return (
    <div class="kanban-container">
      <div class="kanban-header">
        <h1>Project Dashboard</h1>
        <p style="color: rgba(255, 255, 255, 0.6); font-size: 1.1rem;">Manage your workflow with style</p>
      </div>
      <div class="kanban-board">
        {columns().map((col, idx) => (
          <KanbanColumn column={col} columnIndex={idx} onMove={moveTask} onAdd={addTask} />
        ))}
      </div>
    </div>
  );
}
