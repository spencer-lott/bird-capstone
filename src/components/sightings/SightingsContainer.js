import { useState } from "react"
import { SightingsSearch } from "../sightings/SightingsSearch"
import { SightingsList } from "../sightings/SightingsList"

export const SightingsContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")

    return(<>
    <SightingsSearch setterFunction={setSearchTerms}/>
    <SightingsList searchTermState={searchTerms}/>
    </>
    )
}