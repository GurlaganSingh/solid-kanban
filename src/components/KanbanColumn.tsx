import { createSignal } from 'solid-js';
import { Column, Task } from '../types';
import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';

interface Props {
  column: Column;
  columnIndex: number;
  onMove: (fromCol: number, fromIdx: number, toCol: number, toIdx?: number) => void;
  onAdd: (colIdx: number, task: Task) => void;
}

export default function KanbanColumn(props: Props) {
  const [dragOver, setDragOver] = createSignal(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const str = e.dataTransfer?.getData('text/plain');
    if (!str) return;
    const { fromCol, fromIdx } = JSON.parse(str);
    props.onMove(fromCol, fromIdx, props.columnIndex);
    setDragOver(false);
  };

  const handleAdd = () => {
    const title = prompt('Enter task title:');
    if (!title) return;
    const description = prompt('Enter description:') || '';
    const priority = (prompt('Priority (high/medium/low):') || 'medium') as 'high' | 'medium' | 'low';
    const assignee = prompt('Assignee:') || 'Unassigned';

    props.onAdd(props.columnIndex, {
      id: Date.now(),
      title,
      description,
      priority,
      assignee
    });
  };

  return (
    <div
      class={`glass-container column liquid-animation ${dragOver() ? 'drag-over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <div class="column-header">
        <h3 class="column-title">{props.column.title}</h3>
        <span class="task-count">{props.column.tasks.length}</span>
      </div>

      <div class="task-list">
        {props.column.tasks.map((task, taskIdx) => (
          <TaskCard
            task={task}
            fromCol={props.columnIndex}
            fromIdx={taskIdx}
            onMove={props.onMove}
          />
        ))}
        <AddTaskButton onClick={handleAdd} />
      </div>
    </div>
  );
}
