import { useEffect, useState } from "react"
import { Tasks } from "./Tasks"
import { useNavigate } from "react-router-dom"


export const TaskList = () => {
  const [filteredIncompleteTasks, setFilteredIncompleteTasks] = useState([])
  const [filteredCompleteTasks, setFilteredCompleteTasks] = useState([])

  const navigate = useNavigate()

  const localBirdUser = localStorage.getItem("bird_user")
  const birdUserObject = JSON.parse(localBirdUser)

  const [tasks, setTasks] = useState([])

  useEffect(()=>{
    fetch(`http://localhost:8088/tasks`)
    .then(r => r.json())
    .then(returnedTasks => setTasks(returnedTasks))
  },[])


  useEffect(() => {
    const personalIncompleteTasks = tasks.filter(task => task.userId === birdUserObject.id && task.completed === false).sort((a, b) => b.priority - a.priority)
    setFilteredIncompleteTasks(personalIncompleteTasks)

    const personalCompleteTasks = tasks.filter(task => task.userId === birdUserObject.id && task.completed === true)
    setFilteredCompleteTasks(personalCompleteTasks)
  }, [tasks])

  return (
    <>
      <article className="task-list">

       
        <div className="incomplete-tasks">
          <h2>Birds To See</h2>
          <button onClick={() => navigate("/tasks/create")}>Create Bird to See</button>


          {filteredIncompleteTasks.map((task) => (
            <Tasks key={task.id} task={task} updateTasks={setTasks} />
            ))}

        </div>
        
        <div className="complete-tasks">
          <h2>Done</h2>
          {filteredCompleteTasks.map((task) => (
            <Tasks key={task.id} task={task} updateTasks={setTasks} /> 
            ))}
        <p>(Double click to edit any task!)</p>
        </div>

      </article>
    </>
  )
}
