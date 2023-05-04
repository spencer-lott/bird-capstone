import { useState } from "react"
import { SightingsInlineEdit } from "./SightingsInlineEdit"
import { Card } from "react-bootstrap"
import "./Sightings.css"

export const Sightings = ({sightingProp, updateSightings}) => {
    const [showEdit, setShowEdit] = useState(false)

    return(
        !showEdit ?   
        <article className="grid">
        <section className="individualSightingsCards"
        onDoubleClick={() => setShowEdit(true)}
        >

            <Card style={{ width: '18rem' }}>
            {
                sightingProp.image === "" 
                ?
                <><Card.Img variant="top" src={"https://preview.redd.it/childhood-cartoons-roundup-road-runner-wile-e-coyote-v0-4nim8d03x4d91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=d415635e6f4443c4538179ff93618696f1b3c645"} alt={"url doesn't work"} /></>
                :
                <Card.Img variant="top" src={sightingProp.image} alt={"url doesn't work"} />
            }
                    <Card.Body>
                        <Card.Title className="speciesTitle">{sightingProp.species}</Card.Title>
                        <div>
                            <p className="sightingDate">{sightingProp.dateSeen}</p>
                            <p>{sightingProp.description}</p>
                            <p className="sightingLocation">[{sightingProp.location}]</p>
                        </div>

                    </Card.Body>
                </Card>

            </section>
        </article>

                :
                < SightingsInlineEdit sightingProp={sightingProp} updateSightings={updateSightings} setShowEdit={setShowEdit}/>
    )

}
