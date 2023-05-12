import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SightingsSearch } from "../sightings/SightingsSearch"
import { SightingsList } from "../sightings/SightingsList"
import { SightingsTable } from "./SightingsTable"
import { Button } from "react-bootstrap"
import "./Sightings.css"

//Sightings Container is necessary for our bird search feature. With this container the user is able to use the search input of the child component and have the it affect the parent component
export const SightingsContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")
    const navigate = useNavigate()

    return(
    <main className="sightingWholePageContainer" >
        <img className="sightingsBackground" src="/images/evergreenForest.jpg" alt="try again"/>
            <article className="sightingsMainContainer">
                <section className="sightingsTop">
                    <h1 className="sightingsHeader">Sightings</h1>  
                </section>

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

                <SightingsTable />
                <SightingsList searchTermState={searchTerms}/>
            </article>
        </main>  
    )
}