import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TaskForm = ({updateTasks}) => {

    const [task, update] = useState({
        description: "",
        priority: false
        // finishDate: ""

    })

    const navigate = useNavigate()

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


    const taskToSendToAPI = {
        userId: birdUserObject.id,
        description: task.description,
        priority: Boolean(task.priority),
        completed: false,
        // finishDate: task.finishDate

    }

        fetch(`http://localhost:8088/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskToSendToAPI)
    })
   
            .then(response => response.json())
            .then(() => {
                navigate("/tasks")
            })
    }



    return (
        <form className="taskForm"
        style={{paddingTop: "4em"}}
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >

            <h2 className="taskForm__title">New Bird</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="bird"
                        value={task.description}
                        onChange={
                            (event) => {
                                const copy = {...task}
                                copy.description = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <input
                        name="priority"
                        type="checkbox"
                        className="form-control-check"
                        value={task.priority}
                         onChange={
                            (event) => {
                                const copy = {...task}
                                copy.priority = event.target.value
                                update(copy)
                            }
                         } 
                        />
                </div>
            </fieldset>
            
            <button 
                className="btn btn-primary">
                Submit Task
            </button>

        </form>
    )
}