import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SightingsForm = ({updateTasks}) => {

    const [sighting, update] = useState({
        species: "",
        description: "",
        dateSeen: "",
        location: "",
        image: ""

    })

    const navigate = useNavigate()

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()


    const sightingToSendToAPI = {
        userId: birdUserObject.id,
        species: sighting.species,
        description: sighting.description,
        dateSeen: sighting.dateSeen,
        location: sighting.location,
        image: sighting.image

    }

        fetch(`http://localhost:8088/sightings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sightingToSendToAPI)
    })
   
            .then(response => response.json())
            .then(() => {
                navigate("/sightings")
            })
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
                                update(copy)
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
                                        update(copy)
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
                                        update(copy)
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
                                        update(copy)
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
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
            
            <button 
                className="btn btn-primary">
                Submit Sighting
            </button>

        </form>
    )
}