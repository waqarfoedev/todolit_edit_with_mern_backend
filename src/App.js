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
     const getTasks= async () => {
      const taskFromServer = await  fetchTasks()
      setTasks(taskFromServer)
     }
      getTasks()
  }, [])
// //////////////Fetch Taka//////////////////////////////////////////////////////////////////////
const fetchTasks= async()=>{
  const res= await fetch('http://localhost:5000/tasks')
  const data= await res.json()

  return data
  }
///////////////////////////////////////////////
  ////////////// delete Tasks/////////////////
// delete Tasks
const deleteTask=async(id) =>{
  await fetch(`http://localhost:5000/tasks/${id}`,
  { method:'DELETE'
})
  setTasks(tasks.filter((task) => task.id !== id ))
}
////////////////////////////////////////////////////

// Add Task
// const onAdd=(task)=>{
//   const id=Math.floor(Math.random()*10000)+1
//   const newTask = {id, ...task}
//   setTasks([...tasks, newTask])
// }

//////////Add Tasks into db.json//////////////////////////
const onAdd = async (task)=>{
  const res= await fetch('http://localhost:5000/tasks',
  {
  method:'POST',
  headers:{
    'Content-type': 'application/json'
        },
  body: JSON.stringify(task)
})
  const data= await res.json()
  setTasks([...tasks, data])
}
///////////////////////////////////////////////////////////////////////////////////////////
// toggleReminder
  // const toggleReminder=(id)=>{
  //   setTasks(tasks.map((task)=>task.id===id ? {...task, reminder : !task.reminder} : task))
  // }

/////////////////////////toggle Reminder ////////////////////////////////////////////////////////////////
/////////////////////Fetch single Task/////////////////////////////////////////////////////
const fetchTask=async (id) =>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
 
    return data
}
//////////////////////////////////////////////
const toggleReminder= async (id) =>{
  const taskToToggle =await fetchTask(id)
  const updTask ={...taskToToggle, reminder: !taskToToggle.reminder}
  const res=await   fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'PUT',
    headers:{
      'Content-type':'application/json',
    },
    body:JSON.stringify(updTask),
  })
  
  const data=await  res.json()
  setTasks(tasks.map((task)=>
  task.id===id ? {...task, reminder:data.reminder} : task))
  
}
/////////////////////////////////////////////////////////////////////////
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
