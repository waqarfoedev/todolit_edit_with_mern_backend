import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateTask = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [desc, setDesc] = useState("");
  const [reminder, setReminder] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTask(id);
      setText(taskFromServer.text);
      setDay(taskFromServer.day);
      setDesc(taskFromServer.desc);
      setReminder(taskFromServer.reminder);
    };
    getTasks();
  }, [id]);

  const fetchTask = async (id) => {
    // const res = await fetch(
    //   `https://63cc9c87ea85515415228ef7.mockapi.io/tasks/${id}`
    // );
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };
  //////////////////////on Update Function ////////////////////////
  const onUdt = async (e) => {
    e.preventDefault();
    const empdatail = { text, day, reminder, desc };
    fetch(`http://localhost:5000/tasks/update/` + id,
      // const res = await fetch(
      // `https://63cc9c87ea85515415228ef7.mockapi.io/tasks/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(empdatail),
      }
    );
    navigate("/");
    window.location.reload();

  };

  return (
    <div>
      <form className="add-form" onSubmit={onUdt}>
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add Task"
          />
        </div>
        <div className="form-control">
          <label>Day & Time</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Add Day & Time"
          />
        </div>
        <div className="form-control">
          <label>Description (Optional)</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="write task description in details"
          />
        </div>
        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type="checkbox"
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" value="Update Task" className="btn btn-block" />
      </form>
    </div>
  );
};
