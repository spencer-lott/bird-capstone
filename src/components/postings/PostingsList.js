import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Postings } from "../postings/Postings";
import { Button } from "react-bootstrap";
import "./Postings.css"

//This function's purpose is to display all the posts on one page
export const PostingsList = () => {
        const [postings, setPostings] = useState([])
        const [sortedPostings, setSortedPostings] = useState([])
        const [users, setUsers] = useState([])
        const navigate = useNavigate()
    
        const localBirdUser = localStorage.getItem("bird_user")
        const birdUserObject = JSON.parse(localBirdUser)
    
    //Here we sort each post by date. This will give us the most recent post first.
        useEffect(() => {
            const sortPostingsByDate = postings.sort((a, b) => new Date(b.date) - new Date(a.date))
            setSortedPostings(sortPostingsByDate)
        },[postings])

    //Fetching all the information for each post
        useEffect(
            () => {
                fetch(`http://localhost:8088/postings`)
                .then(response => response.json())
                .then((postingsArray) => {
                    setPostings(postingsArray)
                })
            },
            [] 
        )

    //Fetching all the information about each user
        useEffect(
            () => {
                fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then((usersArray) => {
                    setUsers(usersArray)
                })
            },
            [] 
        )
        return <>
    
            <main className="postingsWholeContainer" style={{marginTop: "3em"}}>
            <img className="sightingsBackground" src="/images/lightBirdSeeds.jpg" alt="try again"/>
                <div className="postingsContainer">
                    <article className="postingsTop">
                        <h2 className="postingsHeader" >Bird Feed</h2>
                            <Button style={{marginTop: "16px",
                                            marginLeft: "70%", 
                                            transition: "all 0.3s ease-out",
                                            backgroundColor: "#355e3b",
                                            border: "solid #39545f 0.5px"}} 
                                    onClick={() => navigate("/postings/create")}>
                                New Post
                            </Button>
                    </article>
                    <article className="postings">
                        {
                            sortedPostings.map(
                                (posting) => <Postings
                                key={`posting--${posting.id}`} 
                                currentUser={birdUserObject}
                                users={users} 
                                postingProp={posting}
                                updatePostings={setPostings} 
                                />
                            )
                        }
                    </article>
                </div>
            </main>
        </>
    }

