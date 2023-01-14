import {FaTimes} from "react-icons/fa";

function Task({task, onDelete, onToggle}) {
  return (
    <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={()=> onToggle(task.id)} >
         <h3 key={task.id}>
             {task.text}
             <FaTimes onClick={() =>onDelete(task.id)}style={{color:'red'}}/>
             </h3>
         <p>{task.day}</p>
         <code>{task.desc}</code>
    </div>
  )
}

export default Task