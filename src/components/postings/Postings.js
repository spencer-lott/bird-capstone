import { useState } from "react";
import { PostingsEdit } from "./PostingsEdit";

export const Postings = ({postingProp, currentUser, users, updatePostings }) => {
    const [showEdit, setShowEdit] = useState(false)

    const currentUserInfo = users.find(user => user.id === postingProp.userId)


    const editOrNoEdit = () => {
        if(currentUser.id === postingProp.userId && !showEdit) {
            return <>
            <button className="editButton" onClick={() => setShowEdit(true)}>Edit</button>
            </>
        }
    }

    const deleteOrNoDelete = () => {
        if(currentUser.id === postingProp.userId) {
            return <button onClick={() => {
 
    
                fetch(`http://localhost:8088/postings/${postingProp.id}`, {
                method: "DELETE"
                })
                .then(() => fetch(`http://localhost:8088/postings`))
                .then(response => response.json())
                .then(returnedPostings => updatePostings(returnedPostings))
                .then(() => setShowEdit(false))
            }} className="posting_delete">Delete</button>
        } else {
            return ""
        }
    }

    return (
        !showEdit 
        ? 
        <section className="posting">
            {
                postingProp.image === "" 
                ?
                    <></>
                :
                <img src={postingProp.image} alt={"url doesn't work"} />
            }
            <div>{postingProp.description} {editOrNoEdit()} {deleteOrNoDelete()}</div>
            <div>- {currentUserInfo?.fullName} {postingProp.date}</div>
        </section>
        :
        <>
            < PostingsEdit postingProp={postingProp} updatePostings={updatePostings} setShowEdit={setShowEdit}/>
        </>
    )
}
