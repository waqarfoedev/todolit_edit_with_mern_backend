import { useState } from "react"

function AddTask({onAdd}) {

    const [text, setText]=useState('')
    const [day, setDay]=useState('')
    const [desc, setDesc]=useState('')
    const [reminder, setReminder]=useState(false)


    const onSubmit=(e)=>{
        e.preventDefault()

        if(!text){
            alert('please add task')
            return
        }
        onAdd({text, day, reminder, desc})
        setText('')
        setDay('')
        setDesc('')
        setReminder(false)


    }
  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input type='text' value={text} onChange={(e)=> setText(e.target.value)} placeholder="Add Task" />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input type='text' value={day} onChange={(e)=> setDay(e.target.value)} placeholder="Add Day & Time" />
        </div>
        <div className="form-control">
            <label>Description</label>
            <input type='text' value={desc} onChange={(e)=> setDesc(e.target.value)} placeholder="write task description in details" />
        </div>
        <div className="form-control form-control-check" >
            <label>Set Reminder</label>
            <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}  />
        </div>
        <input type='submit' value='Save Task' className="btn btn-block"/>
    </form>
  )
}

export default AddTask