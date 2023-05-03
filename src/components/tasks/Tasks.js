import { useState } from "react"
import { useEffect } from "react"
import { InlineEdit } from "./TaskInlineEdit"


export const Tasks = ( {task, updateTasks} ) => {

    const [isChecked, setIsChecked] = useState(task.completed)
    const [showEdit, setShowEdit] = useState(false)

    //All of this that comes before the return changes the completed status of your tasks
    useEffect(() => {
        setIsChecked(task.completed)
      }, [task.completed])

    const handleCheckboxChange = (event) => {

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
            // finishDate: task.finishDate
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


const deleteButton = () => {
    if (task.completed === true) {
        return <button onClick={() => {

            fetch(`http://localhost:8088/tasks/${task.id}`, {
                method: "DELETE"
              })
                .then(() => fetch(`http://localhost:8088/tasks`))
                .then(response => response.json())
                .then(returnedTasks => updateTasks(returnedTasks))
        
        }}
     className="ticket__delete">Delete</button>
    }
    else {
        return ""
    }

    
}

return (
        !showEdit ?   
        <>
        <section
        onDoubleClick={() => setShowEdit(true)}
        style={{backgroundColor: task.completed ? /*gray*/ 'rgb(220,220,220)' : task.priority ? /*red*/ 'rgb(237,41,57)' : /*blue*/ 'rgb(150,222,209)'}}
        >
                <input type="checkbox" onChange={handleCheckboxChange} value={isChecked}  checked={isChecked} />
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
    



