interface Props { onClick: () => void }

export default function AddTaskButton(props: Props) {
  return (
    <button class="add-task-btn" onClick={props.onClick}>
      + Add new task
    </button>
  );
}
