import { useState } from "react"
import { SightingsInlineEdit } from "./SightingsInlineEdit"

export const Sightings = ({sightingProp, updateSightings}) => {
    const [showEdit, setShowEdit] = useState(false)

    return(
        !showEdit ?   
        <section className="sightingProp"
        onDoubleClick={() => setShowEdit(true)}
        >
                <div>{sightingProp.dateSeen}</div>
                <div><b>{sightingProp.species}</b></div>
                <img src={sightingProp.image} alt={sightingProp.species} />;
                <div>Description: {sightingProp.description}</div>
                <div>Location: {sightingProp.location}</div>
                </section>

                :
                < SightingsInlineEdit sightingProp={sightingProp} updateSightings={updateSightings} setShowEdit={setShowEdit}/>
    )

}
