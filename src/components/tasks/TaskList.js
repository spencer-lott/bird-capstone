import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tasks } from "./Tasks"
import { Button, Accordion } from "react-bootstrap"
import "./Tasks.css"

//This function's purpose is to display all the tasks on one page
export const TaskList = () => {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])

  const [filteredIncompleteTasks, setFilteredIncompleteTasks] = useState([])
  const [filteredCompleteTasks, setFilteredCompleteTasks] = useState([])

  const localBirdUser = localStorage.getItem("bird_user")
  const birdUserObject = JSON.parse(localBirdUser)

  //Fetching all tasks from the database
  useEffect(()=>{
    fetch(`http://localhost:8088/tasks`)
    .then(r => r.json())
    .then(returnedTasks => setTasks(returnedTasks))
  },[])

  //This observes tasks and sets them to two different states. If the user's incomplete task is a priority, it goes on top, if not it goes below it. The completed tasks got to a different container
  useEffect(() => {
    const personalIncompleteTasks = tasks.filter(task => task.userId === birdUserObject.id && task.completed === false).sort((a, b) => b.priority - a.priority)
    setFilteredIncompleteTasks(personalIncompleteTasks)

    const personalCompleteTasks = tasks.filter(task => task.userId === birdUserObject.id && task.completed === true)
    setFilteredCompleteTasks(personalCompleteTasks)
  }, [tasks])

  return (
    <>
    
        <article className="task-page">
          <img className="sightingsBackground" src="/images/cattails.jpg" alt="try again"/>

            <div className="task-page-container">
                <section className="task-top">
                  <h1 className="task-header" >Watchlist</h1>
                  <p style={{fontStyle: "italic"}}>(Double click to edit any task!)</p>
                </section>

                <section className="task-list">
                  <div className="incomplete-tasks">
                    <div className="incomplete-tasks-header">
                      <h2>List</h2>
                      <Button style={{
                                transition: "all 0.3s ease-out",
                                backgroundColor: "#355e3b",
                                border: "solid #39545f 0.5px",
                                opacity: "0.9"
                                }} 
                              onClick={() => navigate("/tasks/create")}>Add bird</Button >
                    </div>

                      {filteredIncompleteTasks.map((task) => (
                        <Tasks key={task.id} task={task} updateTasks={setTasks} />
                        ))}
                  </div>
                  <div className="complete-tasks">
                    <h2 className="complete-tasks-header">Completed</h2>
                      <Accordion style={{backgroundColor: "darkGray"}}>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header >Completed Watchlist</Accordion.Header>
                            <Accordion.Body style={{backgroundColor: "#355e3b", color: "#355e3b" }}>
                                {filteredCompleteTasks.map((task) => (
                                  <Tasks key={task.id} task={task} updateTasks={setTasks} /> 
                                  ))}
                            </Accordion.Body>
                            </Accordion.Item>
                      </Accordion>
                  </div>
                </section>

            </div>
        </article>
      
    </>
  )
}

