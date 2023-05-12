// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"



// export const SightingsEdit = () => {
//     const [sighting, updateSighting] = useState({
//         description: ""
//     })

//     const { tasksId } = useParams()
    
//     useEffect(
//         () => {
//             fetch(`http://localhost:8088/tasks/${tasksId}`)
//                 .then(response => response.json())
//                 .then((tasksArray) => {
//                     updateSighting(tasksArray)
// })
//         },
//         [tasksId]
//     )

//     const inputOnChange = (event) => {
       
//         const copy = {...sighting}
//         copy[`${event.target.description}`] = event.target.value
//         updateSighting(copy)
    
//     }


//         const handleSaveButtonClick = (event) => {
//             event.preventDefault()
    
//             return fetch(`http://localhost:8088/tasks/${sighting.id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(sighting)
//             })
//                 .then(response => response.json())
//                 .then(() => {
    
    
//         })
//     }

//     return (
//         <form className="taskForm"
//         onSubmit={handleSaveButtonClick}>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="description">Description:</label>
//                     <input
//                         required autoFocus
//                         type="text"
//                         className="form-control"
//                         placeholder="Brief description"
//                         value={sighting.description}
//                         onChange={inputOnChange}
//                          />
//                 </div>
//             </fieldset>
            
//             <button 
//                 className="btn btn-primary">
//                 Submit task
//             </button>

//         </form>
//     )
// }