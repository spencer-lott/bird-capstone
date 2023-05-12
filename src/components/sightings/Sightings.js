import { useState } from "react"
import { SightingsInlineEdit } from "./SightingsInlineEdit"
import "./Sightings.css"

//This function is what makes up each individual sighting icon
export const Sightings = ({sightingProp, updateSightings}) => {
    const [showEdit, setShowEdit] = useState(false)
    
    //This function is necessary to keep the image outline and formatting for when a user uploads an image with a bad URL. It also has inline edit which the user can use by double clicking the icon to edit their sighting
    const BrokenImage = () => {
        return 
    }

    return(
        !showEdit ?   
        <>
        <article className="grid">
        <section className="individualSightingsCards"
        onDoubleClick={() => setShowEdit(true)}
        >

            <div className = "hoverImageContainer">
                <div className= "frame col-xs-6" >
            {
                sightingProp.image === ""
                ?
                    <img src="https://preview.redd.it/childhood-cartoons-roundup-road-runner-wile-e-coyote-v0-4nim8d03x4d91.jpg?width=1080&crop=smart&auto=webp&v=enabled&s=d415635e6f4443c4538179ff93618696f1b3c645" alt={"url doesn't work"}/>
                    :
                    <>
                    <img style={{color: "black", fontWeight: "bold", backgroundSize: "200px"}} src={sightingProp.image} alt={BrokenImage()} onError={() => alert("Failed to load image! Please upload a functioning URL.")}/>
                    </>
                }
                        <div className="detailsContainer">
                            <div className = "details">
                                <h1>{sightingProp.species}</h1>
                                <p style={{textDecoration: "underline"}}>Spotted: {sightingProp.dateSeen}</p>
                                <p>{sightingProp.description}</p>
                                <p style={{fontStyle:"italic"}}>{sightingProp.location}</p>
                            </div>
                        </div>
            </div>

            </div>
        </section>
        </article>
        </>
                :
                < SightingsInlineEdit sightingProp={sightingProp} updateSightings={updateSightings} setShowEdit={setShowEdit}/>
    )

   
}
