import { useState, useEffect } from "react"
import "./Postings.css"
import { Button } from "react-bootstrap"

export const PostingsEdit = ({postingProp, updatePostings, setShowEdit}) => {
    const [posting, setPosting] = useState({
        userId: postingProp.userId,
        description: postingProp.description,
        date: postingProp.date,
        image: postingProp.image
    })

        const handleSaveButtonClick = (event) => {
            event.preventDefault()
    
            fetch(`http://localhost:8088/postings/${postingProp.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(posting)
            })
            .then(() => fetch(`http://localhost:8088/postings`))
            .then(response => response.json())
            .then(returnedPostings => updatePostings(returnedPostings))
            .then(()=> setShowEdit(false) )
    
    }

        const handleDeleteButtonClick = (event) => {
            event.preventDefault()
        
            fetch(`http://localhost:8088/postings/${postingProp.id}`, {
            method: "DELETE"
            })
            .then(() => fetch(`http://localhost:8088/postings`))
            .then(response => response.json())
            .then(returnedPostings => updatePostings(returnedPostings))
            .then(() => setShowEdit(false))
        }

    return (
        <form className="postingForm"
        onSubmit={(clickEvent) => handleSaveButtonClick(clickEvent)}
        >
            <div className="xButton" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button 
                style={{backgroundColor: "transparent",
                border: "none"}}
                onClick={()=> setShowEdit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
                </Button>
            </div>

            <h2 className="postingForm__title">Edit post</h2>
            
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
                                        setPosting(copy)
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
                                        setPosting(copy)
                                    }
                                } />
                        </div>
                    </fieldset>

            <button 
                className="btn btn-primary">
                Save edits
            </button>
            <footer>
            <Button 
                variant="danger"
                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">
                Delete
            </Button>
                    </footer>
                    

        </form>
    )
}