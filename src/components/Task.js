import { FaTimes } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const Task = ({ task, onDelete, onToggle, onUpdate }) => {
  return (
    <div
      className={`task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task._id)}
    >
      <h3>
        {task.text}
        <FaTimes onClick={() => onDelete(task._id)} style={{ color: "red" }} />
      </h3>
      <p>
        {task.day}{" "}
        <FiEdit style={{ color: "green" }} onClick={() => onUpdate(task._id)} />
      </p>
      <code>{task.desc}</code>
    </div>
  );
};

export default Task;
