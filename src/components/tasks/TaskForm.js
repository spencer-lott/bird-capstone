import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const TaskForm = () => {

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
        <div className="taskFormContainer" style={{backgroundColor: "#f2ffe8"}}>
        <form className="taskForm"
        style={{width: "25%", marginLeft: "37%", paddingTop: "8%", paddingBottom: "35%"}}
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >
            <div className="xButton" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                onClick={()=> navigate("/tasks")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
                </Button>
            </div>

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
                style={{
                    transition: "all 0.3s ease-out",
                    backgroundColor: "#355e3b"
                    }} 
                className="btn btn-primary">
                Submit Task
            </button>

        </form>
        </div>
    )
}