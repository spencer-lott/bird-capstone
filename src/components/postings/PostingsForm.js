import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Postings.css"
import { Button } from "react-bootstrap"

export const PostingsForm = () => {
    const navigate = useNavigate()

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    const [posting, update] = useState({
        description: "",
        date: "",

    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    const postingToSendToAPI = {
        userId: birdUserObject.id,
        description: posting.description,
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
                navigate("/")
            })
    }

    return (
        <div className="postingFormContainer" style={{backgroundColor: "#f2ffe8"}}>
        <form className="postingForm"
        style={{width: "25%", marginLeft: "37%", paddingTop: "8%", paddingBottom: "35%"}}
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >

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
            
            <Button
                style={{
                    transition: "all 0.3s ease-out",
                    backgroundColor: "#355e3b"
                    }} 
                className="btn btn-primary">
                Submit post
            </Button>

        </form>
        </div>
    )
}