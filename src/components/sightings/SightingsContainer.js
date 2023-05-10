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
        <img className="sightingsBackground" src="/images/evergreenForest.jpg" alt="try again"/>
            <main className="sightingsMainContainer">
            <article className="sightingsTop">
                <h1 className="sightingsHeader">Sightings</h1>  
            </article>

            <section className="sightingsSearch">
                <SightingsSearch setterFunction={setSearchTerms}/>

                <div className="newSightingButton">
                    <Button style={{padding: "1.5em",
                                    transition: "all 0.3s ease-out",
                                    backgroundColor: "#355e3b",
                                    border: "solid #39545f 0.5px",
                                    opacity: "0.9"}} 
                            onClick={() => navigate("/sightings/create")}>Create New Sighting</Button>
                </div>
            </section>

                    <SightingsList searchTermState={searchTerms}/>
                </main>
        </article>  
    )
}