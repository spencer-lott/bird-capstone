import { useState } from "react";
import { PostingsEdit } from "./PostingsEdit";
import { Card, Button } from "react-bootstrap";
import "./Postings.css"

export const Postings = ({postingProp, currentUser, users, updatePostings }) => {
    const [showEdit, setShowEdit] = useState(false)

    const currentUserInfo = users.find(user => user.id === postingProp.userId)


    const editOrNoEdit = () => {
        if(currentUser.id === postingProp.userId && !showEdit) {
            return <>
            <Button style={{backgroundColor: "transparent",
                border: "none"}}
                className="editButton" onClick={() => setShowEdit(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg></Button>
            </>
        }
    }

    const deleteOrNoDelete = () => {
        if(currentUser.id === postingProp.userId) {
            return <Button 
            style={{backgroundColor: "transparent",
                border: "none"}}
            onClick={() => {
    
                fetch(`http://localhost:8088/postings/${postingProp.id}`, {
                method: "DELETE"
                })
                .then(() => fetch(`http://localhost:8088/postings`))
                .then(response => response.json())
                .then(returnedPostings => updatePostings(returnedPostings))
                .then(() => setShowEdit(false))
            }} className="posting_delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></Button>
        } else {
            return ""
        }
    }

    return (

            !showEdit 
            ? 
            <section className="post">
                <div className="post-user-heading">
                    <h1 style={{fontSize:"24px"}}>{currentUserInfo?.fullName}</h1> 
                    <div style={{fontStyle: "italic", marginLeft: "1em", paddingTop: "4px"}}>{postingProp.date}</div>
                </div>
                <div className="post-image">
                    {
                        postingProp.image === "" 
                        ?
                            <></>
                        :
                        <img  src={postingProp.image} alt={"url doesn't work"} />
                    }
                </div>
                <div className="post-description">{postingProp.description}  </div>
                <footer className="post-footer">
                    <div>{editOrNoEdit()}</div>
                    <div>{deleteOrNoDelete()}</div>
                </footer>
            </section>
            :
            <>
                < PostingsEdit postingProp={postingProp} updatePostings={updatePostings} setShowEdit={setShowEdit}/>
            </>
   

    )
}



