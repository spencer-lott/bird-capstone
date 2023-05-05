import { useEffect, useState } from "react"
import { Tasks } from "./Tasks"
import { useNavigate } from "react-router-dom"
import "./Tasks.css"
import { Button } from "react-bootstrap"
import { Accordion } from "react-bootstrap"


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
    
        <article className="task-page">
          <img className="sightingsBackground" src="/images/cattails.jpg" alt="try again"/>
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
                            backgroundColor: "#355e3b"
                            }} 
                          onClick={() => navigate("/tasks/create")}>Add bird to watch list</Button >
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

        </article>
      
    </>
  )
}

