import { useState, useEffect } from "react"
import { Sightings } from "./Sightings"
import { useNavigate } from "react-router-dom"


export const SightingsList = ({ searchTermState }) => {
    const navigate = useNavigate()
    const [sightings, setSightings] = useState([])
    const [filteredSightings, setFiltered] = useState([])

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    useEffect(() => {
        const searchedSightings = sightings.filter(sighting => sighting.userId === birdUserObject.id).filter(sighting => {
            return sighting.species.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFiltered(searchedSightings)
    
    },
    [searchTermState]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/sightings`)
        .then(response => response.json())
        .then((sightingsArray) => {
            setSightings(sightingsArray)
        })
    }, [])

    //Filters the tasks and displays the ones for that user
    useEffect(
        () => {
            const personalSightings = sightings.filter(sighting => sighting.userId === birdUserObject.id).sort((a, b) => new Date(b.dateSeen) - new Date(a.dateSeen))
                setFiltered(personalSightings)
        },
        [sightings]
    )

    
return <>

<h2>My Sightings</h2>  
    <button onClick={() => navigate("/sightings/create")}>Create New Sighting</button>
    <p>(Double click to edit any of your sightings!)</p>
      <article className="sightings">
        {filteredSightings.map(sighting => {
            return <Sightings key={sighting.id} sightingProp={sighting} updateSightings={setSightings}/>
        })}
      </article>



</>
    
}