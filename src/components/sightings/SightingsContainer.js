import { useState } from "react"
import { SightingsSearch } from "../sightings/SightingsSearch"
import { SightingsList } from "../sightings/SightingsList"
import "./Sightings.css"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

export const SightingsContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate()

    return(
    <article className="sightingWholePageContainer" >
        <img className="sightingsBackground" src="/images/cattails.jpg" alt="try again"/>

            <article className="sightingsTop">
                <h1 className="sightingsHeader">Sightings</h1>  
                <p style={{fontStyle: "italic"}}>(Double click to edit any of your sightings!)</p>
            </article>

            <section className="sightingsSearch">
                <SightingsSearch setterFunction={setSearchTerms}/>

                <div className="newSightingButton">
                    <Button style={{padding: "1.5em", backgroundColor: "transparent", transition: "all 0.3s ease-out"}} onClick={() => navigate("/sightings/create")}>Create New Sighting</Button>
                </div>
            </section>

                    <SightingsList searchTermState={searchTerms}/>
        </article>  
    )
}