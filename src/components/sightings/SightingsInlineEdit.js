import { useState } from "react"
import { Button } from "react-bootstrap"

export const SightingsInlineEdit = ({sightingProp, updateSightings, setShowEdit}) => {
    const [sighting, setSighting] = useState({
        userId: sightingProp.userId,
        species: sightingProp.species,
        description: sightingProp.description,
        dateSeen: sightingProp.dateSeen,
        location: sightingProp.location,
        image: sightingProp.image

    })




        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            fetch(`http://localhost:8088/sightings/${sightingProp.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sighting)
            })
            .then(() => fetch(`http://localhost:8088/sightings`))
            .then(response => response.json())
            .then(returnedSightings => updateSightings(returnedSightings))
            .then(()=> setShowEdit(false) )
    
    }

        const handleDeleteButtonClick = (event) => {
            event.preventDefault()
        
            fetch(`http://localhost:8088/sightings/${sightingProp.id}`, {
            method: "DELETE"
            })
            .then(() => fetch(`http://localhost:8088/sightings`))
            .then(response => response.json())
            .then(returnedSightings => updateSightings(returnedSightings))
            .then(() => setShowEdit(false))
        }

    return (
        <form className="sightingForm"
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >
                        <div className="xButton" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                onClick={()=> setShowEdit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
                </Button>
            </div>

            <h2 className="sightingForm__title">New Sighting</h2>
            
            <fieldset>
                <div className="form-group">
                <label htmlFor="date-seen">Date Seen:</label>
                <input
                name="date-seen"
                required autoFocus
                type="date"
                className="form-control"
                value={sighting.dateSeen}
                         onChange={
                            (event) => {
                                const copy = {...sighting}
                                copy.dateSeen = event.target.value
                                setSighting(copy)
                            }
                        } 
                        />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="species">Species:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Species"
                                value={sighting.species}
                                onChange={
                                    (event) => {
                                        const copy = {...sighting}
                                        copy.species = event.target.value
                                        setSighting(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Brief description"
                                value={sighting.description}
                                onChange={
                                    (event) => {
                                        const copy = {...sighting}
                                        copy.description = event.target.value
                                        setSighting(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Location"
                                value={sighting.location}
                                onChange={
                                    (event) => {
                                        const copy = {...sighting}
                                        copy.location = event.target.value
                                        setSighting(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="image">Image URL:</label>
                            <input
                                // required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="img"
                                value={sighting.image}
                                onChange={
                                    (event) => {
                                        const copy = {...sighting}
                                        copy.image = event.target.value
                                        setSighting(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
            
            <button 
                className="btn btn-primary">
                Save Edit
            </button>
            <footer>
            <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                variant="danger"
                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg>
            </Button>
                    </footer>
                    

        </form>
    )
}