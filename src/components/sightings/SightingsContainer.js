import { useState } from "react"
import { SightingsSearch } from "../sightings/SightingsSearch"
import { SightingsList } from "../sightings/SightingsList"
import "./Sightings.css"

export const SightingsContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")

    return(<article className="sightingWholePageContainer" style={{backgroundColor: "rgb(1,68,33)"}}>
                <section className="sightingsSearch">
                    <SightingsSearch setterFunction={setSearchTerms}/>
                </section>
                <SightingsList searchTermState={searchTerms}/>
        </article>  
    )
}