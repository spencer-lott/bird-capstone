import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Postings } from "../postings/Postings";
import "./Postings.css"
import { Button } from "react-bootstrap";

export const PostingsList = () => {
        const [postings, setPostings] = useState([])
        const [sortedPostings, setSortedPostings] = useState([])
        const [users, setUsers] = useState([])
        // const [count, setcount] = useState(0)
        const navigate = useNavigate()
    
        const localBirdUser = localStorage.getItem("bird_user")
        const birdUserObject = JSON.parse(localBirdUser)
    
        useEffect(() => {
            const sortPostingsByDate = postings.sort((a, b) => new Date(b.date) - new Date(a.date))
            setSortedPostings(sortPostingsByDate)
        },[postings])

        useEffect(
            () => {
                fetch(`http://localhost:8088/postings`)
                .then(response => response.json())
                .then((postingsArray) => {
                    setPostings(postingsArray)
                })
            },
            [] // When this array is empty, you are observing initial component state
        )
    
        // useEffect(() => {
        //     const interval = setInterval(() => {
        //       console.log('This will run every  second!');
        //       setcount(count => count + 1)
        //     }, 5000);
        //     return () => clearInterval(interval);
        //   }, []);
    
        // useEffect(
        //     () => {
        //         fetchAllMessages()
        //         .then((messageArray) => {
        //             setMessages(messageArray)
        //         })
        //     },
        //     [count] // When this array is empty, you are observing initial component state
        // )
    
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
        <article className="postingsTop">
            <h2 className="postingsHeader" >Bird Feed</h2>
            <Button style={{marginTop: "16px", 
                            transition: "all 0.3s ease-out",
                            backgroundColor: "#355e3b"}} 
                    onClick={() => navigate("/postings/create")}>New Post</Button>
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
    </main>
        </>
    }

