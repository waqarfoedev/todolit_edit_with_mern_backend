import { useNavigate } from "react-router-dom";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  const navigate = useNavigate();
  const onUpdate = (id) => {
    // console.log(`updated ${id}`);
    navigate("tasks/update/" + id);
  };

  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </>
  );
};

export default Tasks;
