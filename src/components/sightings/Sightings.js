import { useState } from "react"
import { SightingsInlineEdit } from "./SightingsInlineEdit"
import { Card } from "react-bootstrap"
import "./Sightings.css"

export const Sightings = ({sightingProp, updateSightings}) => {
    const [showEdit, setShowEdit] = useState(false)

    return(
        !showEdit ?   
        <article className="grid">
        <section className="sightingProp"
        onDoubleClick={() => setShowEdit(true)}
        >
        <div className="sightingCards">

            <Card style={{ width: '18rem' }}>
            {
                sightingProp.image === "" 
                ?
                <></>
                :
                <Card.Img variant="top" src={sightingProp.image} alt={"url doesn't work"} />
            }
                <Card.Body>
                    <Card.Title>{sightingProp.species}</Card.Title>
                    <Card.Text>
                    <div>{sightingProp.dateSeen}</div>
                    <div>{sightingProp.description}</div>
                    <div>[{sightingProp.location}]</div>
                    </Card.Text>

                </Card.Body>
            </Card>

                </div>
            </section>
        </article>

                :
                < SightingsInlineEdit sightingProp={sightingProp} updateSightings={updateSightings} setShowEdit={setShowEdit}/>
    )

}


{/* <Card style={{ width: '18rem' }}>
<Card.Img variant="top" src="holder.js/100px180" />
<Card.Body>
  <Card.Title>Card Title</Card.Title>
   <Card.Text>
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
  </Card.Text>

</Card.Body>
</Card> */}

// return(
//     !showEdit ?   
//     <section className="sightingProp"
//     onDoubleClick={() => setShowEdit(true)}
//     >
//             <div>{sightingProp.dateSeen}</div>
//             <div><b>{sightingProp.species}</b></div>

//         {
//             sightingProp.image === "" 
//             ?
//                 <></>
//             :
//                 <img src={sightingProp.image} alt={"url doesn't work"}/>
//         }
//             <div>Description: {sightingProp.description}</div>
//             <div>Location: {sightingProp.location}</div>
//             </section>

//             :
//             < SightingsInlineEdit sightingProp={sightingProp} updateSightings={updateSightings} setShowEdit={setShowEdit}/>
// )