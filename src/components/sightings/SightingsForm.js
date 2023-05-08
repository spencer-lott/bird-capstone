import { useState } from "react"
import { Button } from "react-bootstrap"
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
        <div className="sightingFormContainer" style={{backgroundColor: "#f2ffe8"}}>
        <form 
        className="sightingForm" 
        style={{width: "25%", marginLeft: "37%", paddingTop: "8%", paddingBottom: "35%"}}
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >

            <div className="xButton" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                onClick={()=> navigate("/sightings")}>
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
                style={{
                    transition: "all 0.3s ease-out",
                    backgroundColor: "#355e3b",
                    border: "solid #39545f 0.5px"
                    }} 
                className="btn btn-primary">
                Submit Sighting
            </button>

        </form>
        </div>
    )
}