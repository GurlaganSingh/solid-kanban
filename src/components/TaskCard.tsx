import { Task } from '../types';

interface Props {
  task: Task;
  fromCol: number;
  fromIdx: number;
  onMove: (fromCol: number, fromIdx: number, toCol: number, toIdx?: number) => void;
}

export default function TaskCard(props: Props) {
  const onDragStart = (e: DragEvent) => {
    // Required for Firefox
    e.dataTransfer?.setData('text/plain', JSON.stringify({ fromCol: props.fromCol, fromIdx: props.fromIdx }));
    (e.currentTarget as HTMLElement).classList.add('dragging');
  };

  const onDragEnd = (e: DragEvent) => {
    (e.currentTarget as HTMLElement).classList.remove('dragging');
  };

  return (
    <div
      class="glass-card task-item liquid-animation"
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{ cursor: 'grab', 'user-select': 'none' }}
    >
      <div class="task-title">{props.task.title}</div>
      <div class="task-description">{props.task.description}</div>
      <div class="task-meta">
        <span class={`priority-badge priority-${props.task.priority}`}>
          {props.task.priority} priority
        </span>
        <span>{props.task.assignee}</span>
      </div>
    </div>
  );
}
