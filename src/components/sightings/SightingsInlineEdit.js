import { useState } from "react"

export const SightingsInlineEdit = ({sightingProp, updateSightings, setShowEdit}) => {
    const [sighting, setSighting] = useState({
        userId: sightingProp.userId,
        species: sightingProp.species,
        description: sightingProp.description,
        dateSeen: sightingProp.dateSeen,
        location: sightingProp.location

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

            
            <button 
                className="btn btn-primary">
                Submit Sighting
            </button>
            <footer>
            <button 
                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">
                Delete
            </button>
                    </footer>
                    

        </form>
    )
}