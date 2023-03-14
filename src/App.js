import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import { UpdateTask } from "./components/UpdateTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);
  // //////////////Fetch Taka//////////////////////////////////////////////////////////////////////
  const fetchTasks = async () => {
    // const res = await fetch(
    //   "https://63cc9c87ea85515415228ef7.mockapi.io/tasks"
    // );
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };
  ///////////////////////////////////////////////
  ////////////// delete Tasks/////////////////
  // delete Tasks
  const deleteTask = async (id) => {
    // await fetch(
    // `https://63cc9c87ea85515415228ef7.mockapi.io/tasks/${id}`,
    await fetch(`http://localhost:5000/tasks/${id}`,
      { method: "DELETE" }
    );
    setTasks(tasks.filter((task) => task._id !== id));
  };
  //////////Add Tasks into db.json//////////////////////////
  const onAdd = async (task) => {
    // const res = await fetch(
    //   "https://63cc9c87ea85515415228ef7.mockapi.io/tasks",
    const res = await fetch("http://localhost:5000/tasks/add/",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////
  // toggleReminder
  // const toggleReminder=(id)=>{
  //   setTasks(tasks.map((task)=>task.id===id ? {...task, reminder : !task.reminder} : task))
  // }

  /////////////////////////toggle Reminder ////////////////////////////////////////////////////////////////
  /////////////////////Fetch single Task/////////////////////////////////////////////////////
  const fetchTask = async (id) => {
    // const res = await fetch(
    //   `https://63cc9c87ea85515415228ef7.mockapi.io/tasks/${id}`
    // );
    const res = await fetch(`http://localhost:5000/tasks/` + id);
    const data = await res.json();

    return data;
  };
  //////////////////////////////////////////////
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    console.log(taskToToggle);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    // const res = await fetch(
    //   `https://63cc9c87ea85515415228ef7.mockapi.io/tasks/${id}`,
    const res = await fetch(`http://localhost:5000/tasks/update/${id}`,

      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      }
    );

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    window.location.reload();
  };
  ///////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={[
              <Header
                onAdd={() => setShowAddTask(!showAddTask)}
                showTask={showAddTask}
              />,
              showAddTask && <AddTask onAdd={onAdd} />,

              tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Task remaining"
              ),
            ]}
          />
          <Route path="tasks/update/:id" element={<UpdateTask />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
