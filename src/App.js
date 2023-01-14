import { useState, useEffect } from 'react';
import './App.css';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Header from './components/Header';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks]=useState([ ])

  useEffect(()=>{
      const fetchTasks= async()=>{
      const res= await fetch('http://localhost:5000/tasks')
      const data= await res.json()
      console.log(data)
      }

      fetchTasks()
  }, [])

// Fetch Taka


// Add Task
const onAdd=(task)=>{
  const id=Math.floor(Math.random()*10000)+1
  const newTask = {id, ...task}
  setTasks([...tasks, newTask])
}

// delete Tasks
  const deleteTask=(id) =>{
    setTasks(tasks.filter((task) => task.id !== id ))
  }

// toggleReminder
  const toggleReminder=(id)=>{
    setTasks(tasks.map((task)=>task.id===id ? {...task, reminder : !task.reminder} : task))
  }
  return (
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} />
      {showAddTask && <AddTask onAdd={onAdd}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : "No Task remaining"}
      <About  />
    </div>
  );
}

export default App;
