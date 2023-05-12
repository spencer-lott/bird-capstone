import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Postings.css"
import { Button } from "react-bootstrap"

//This is the form for the user when they click the button to create a new post. It consists of three inputs. Date, image, description.
export const PostingsForm = () => {
    const navigate = useNavigate()

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    const [posting, update] = useState({
        description: "",
        date: "",
        image: ""

    })

    //This is the function for when the user submits the form, it will add these things to the database, then it takes the user back to the community page
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
    
    const postingToSendToAPI = {
        userId: birdUserObject.id,
        description: posting.description,
        image: posting.image,
        date: new Date().toISOString().split('T')[0]
    }

        fetch(`http://localhost:8088/postings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postingToSendToAPI)
    })
            .then(response => response.json())
            .then(() => {
                navigate("/postings")
            })
    }

    return (
        <div className="postingFormContainer" style={{backgroundColor: "#f2ffe8"}}>
        <form className="postingForm"
        style={{width: "25%", marginLeft: "37%", paddingTop: "8%", paddingBottom: "35%"}}
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >

            <div className="xButton" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                onClick={()=> navigate("/postings")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
                </Button>
            </div>

            <h2 className="postingForm__title">New Post</h2>
            

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Brief description"
                                value={posting.description}
                                onChange={
                                    (event) => {
                                        const copy = {...posting}
                                        copy.description = event.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="image">Image URL:</label>
                            <input
                                // required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="img"
                                value={posting.image}
                                onChange={
                                    (event) => {
                                        const copy = {...posting}
                                        copy.image = event.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
            
            <button
                style={{
                    transition: "all 0.3s ease-out",
                    backgroundColor: "#355e3b",
                    border: "solid #39545f 0.5px"
                    }} 
                className="btn btn-primary">
                Submit post
            </button>

        </form>
        </div>
    )
}