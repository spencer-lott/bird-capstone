import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PostingsEdit } from "./PostingsEdit";
import "./Postings.css"


//This function consists of the actual contents that make up each post
export const Postings = ({postingProp, currentUser, users, updatePostings }) => {
    const [showEdit, setShowEdit] = useState(false)
    const [counter, setCounter] = useState(0)
    const currentUserInfo = users.find(user => user.id === postingProp.userId)

    //This function will add "1" each time the like button is clicked. It stores state into local storage so that we always have the amount of likes
    const likeClicker = () => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        localStorage.setItem(`post-${postingProp.id}-likes`, newCounter);
      };
      //The useEffect is observing the state of the local storage, then sets it
      useEffect(() => {
        const likes = localStorage.getItem(`post-${postingProp.id}-likes`);
        if (likes) {
          setCounter(parseInt(likes));
        }
      }, []);


    //With this function, the user can only edit their own posts. When the user's id matches the post id, then we make it so that they they have the option to edit because we turn show edit true (it is originally false). When the button is clicked it gives us inline edit.
    const editOrNoEdit = () => {
        if(currentUser.id === postingProp.userId && !showEdit) {
            return <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Edit</Tooltip>}
                >
                <Button style={{backgroundColor: "transparent",
                    border: "none"}}
                    className="editButton" onClick={() => setShowEdit(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="blue" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </Button>
                </OverlayTrigger>
            </>
        }
    }

    //With this function, the current user's id has to match the post userId. Then they are given the option to delete their post at any time.
    const deleteOrNoDelete = () => {
        if(currentUser.id === postingProp.userId) {
            return <>
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Delete</Tooltip>}>

                <Button
                className="posting_delete"
                id="tooltip" 
                style={{backgroundColor: "transparent",
                    border: "none"}}
                onClick={() => {
        
                    fetch(`http://localhost:8088/postings/${postingProp.id}`, {
                    method: "DELETE"
                    })
                    .then(() => fetch(`http://localhost:8088/postings`))
                    .then(response => response.json())
                    .then(returnedPostings => updatePostings(returnedPostings))
                    .then(() => setShowEdit(false))}} 
                    >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
            </svg>
            <span id="tooltipText"></span>
            </Button>
          </OverlayTrigger>
          </>
        } else {
            return ""
        }
    }

    //Post only consist of two things. It contains an image and/or description. The user can have one or the other, or have both. This also contains the like button and the options to delete or edit for the current user's post's only
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
                <div className="likeButtonFooter">
                    <Button 
                    onClick={likeClicker}
                    style={{marginLeft: "25px",
                        transition: "all 0.3s ease-out",
                        backgroundColor: "#355e3b",
                        border: "solid #39545f 0.5px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="yellow" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                    <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                    </svg>
                    </Button>
                    <div>({counter})</div>
                    </div>
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



