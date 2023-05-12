import { useState, useEffect } from "react"
import { InlineEdit } from "./TaskInlineEdit"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"

//This function is responsible for the contents of each individual task that gets put into the TaskList
export const Tasks = ( {task, updateTasks} ) => {

    const [isChecked, setIsChecked] = useState(task.completed)
    const [showEdit, setShowEdit] = useState(false)

    //When an incomplete task is checked. We change state to a completed task. It then alerts the user to do an action. If a task is already complete and the user checks the box again, it becomes an incomplete task again. It also automatically changes priority incomplete task values to false.
    useEffect(() => {
        setIsChecked(task.completed)
      }, [task.completed])

    const handleCheckboxChange = () => {

        const completed = !isChecked
       
        setIsChecked(completed)

        if (completed) {
            alert("Don't forget to log your sighting!");
          }

        const thingToSendToAPI = {
            userId: task.userId,
            description: task.description,
            priority: false,
            completed: completed
        }

        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(thingToSendToAPI)
        })
            .then(() => fetch(`http://localhost:8088/tasks`))
            .then(response => response.json())
            .then(returnedTasks => updateTasks(returnedTasks))
            .then(()=> setShowEdit(false) )
}

    //This is another delete button that is similar to my other delete buttons except for the fact that the delete button only shows on tasks that are completed
    const deleteButton = () => {
        if (task.completed === true) {
            return <>
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete</Tooltip>}
            >
            <Button 
            style={{backgroundColor: "transparent",
                    border: "none"}}
            className="ticket__delete"
            onClick={() => {

                fetch(`http://localhost:8088/tasks/${task.id}`, {
                    method: "DELETE"
                })
                    .then(() => fetch(`http://localhost:8088/tasks`))
                    .then(response => response.json())
                    .then(returnedTasks => updateTasks(returnedTasks))
            
            }}
            ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></Button>
          </OverlayTrigger>
          </>
    }
    else {
        return ""
    }
    
}
    //We have inline edit here. If a task needs modified it can be double clicked and it will display the inline edit form where the task is.
return (
        !showEdit ?   
        <>
        <section
            className="individualTasks"
            onDoubleClick={() => setShowEdit(true)}
            style={{
                backgroundColor: task.completed ? /*gray*/ '#4f7942' : task.priority ? /*rosewood*/ '#65000b' : /*Spanish Bistre*/ '#80755a',
                color: task.priority ? "red" : "black",
                fontWeight: task.priority ? "bold" : "550",
                border: "solid #39545f 0.5px",
                marginBottom: "2px",
                boxShadow: "0px 12px 18px -6px rgba(0,0,0.3)" }}
            >
                    <input className="tasksInput" type="checkbox" onChange={handleCheckboxChange} value={isChecked}  checked={isChecked} />
                    {task.description}
                    {
                        deleteButton()
                    }

        </section>
                </>      
            :
            < InlineEdit taskProp={task} updateTasks={updateTasks} setShowEdit={setShowEdit}/>
    )  
    
}
    





