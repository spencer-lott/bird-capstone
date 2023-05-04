import { useState } from "react"
import { Button } from "react-bootstrap"

export const InlineEdit = ({taskProp, updateTasks, setShowEdit}) => {
    const [task, setTask] = useState({
        userId: taskProp.userId,
        description: taskProp.description,
        priority: taskProp.priority,
        completed: taskProp.completed
        // finishDate: taskProp.finishDate

    })


        const handleSaveButtonClick = (event) => {
            event.preventDefault()

            const newTask ={
                userId: task.userId,
                description: task.description,
                priority: Boolean(task.priority),
                completed: task.completed
                // finishDate: task.finishDate
            }
    
            fetch(`http://localhost:8088/tasks/${taskProp.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })
            .then(() => fetch(`http://localhost:8088/tasks`))
            .then(response => response.json())
            .then(returnedTasks => updateTasks(returnedTasks))
            .then(()=> setShowEdit(false) )
    
    }

    const handleDeleteTaskButton = (event) => {
        event.preventDefault()
    
        fetch(`http://localhost:8088/tasks/${taskProp.id}`, {
          method: "DELETE"
        })
          .then(() => fetch(`http://localhost:8088/tasks`))
          .then(response => response.json())
          .then(returnedTasks => updateTasks(returnedTasks))
          .then(() => setShowEdit(false))
      }

    return (
        <form className="taskForm"
        onSubmit={handleSaveButtonClick}>

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
                            (evt) => {
                                const copy = {...task}
                                copy.description = evt.target.value
                                setTask(copy)
                            }
                        }
                         />
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
                                setTask(copy)
                            }
                         } 
                        />
                </div>
            </fieldset>
            
            <button 
                className="btn btn-primary">
                 Save Edits
            </button>
            <footer>
            <Button 
                variant="danger"
                onClick={(clickEvent) => handleDeleteTaskButton(clickEvent)}
                className="btn btn-primary">
                Delete
            </Button>
                    </footer>

        </form>
    )
}