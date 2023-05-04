import { useState, useEffect } from "react"
import "./Postings.css"

export const PostingsEdit = ({postingProp, updatePostings, setShowEdit}) => {
    const [posting, setPosting] = useState({
        userId: postingProp.userId,
        description: postingProp.description,
        date: postingProp.date
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
            <button 
                onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}
                className="btn btn-primary">
                Delete
            </button>
                    </footer>
                    

        </form>
    )
}