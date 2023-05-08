import "./Home.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Notification = () => {

        const localBirdUser = localStorage.getItem("bird_user")
        const birdUserObject = JSON.parse(localBirdUser)
        const [tasks, setTasks] = useState([])
        const [filteredPriority, setFilteredPriority] = useState([])
        const navigate = useNavigate()
    
        useEffect(()=>{
          fetch(`http://localhost:8088/tasks`)
          .then(r => r.json())
          .then(returnedTasks => setTasks(returnedTasks))
        },[])
    
    
        useEffect(() => {
            const personalPriority = tasks.filter(task => task.userId === birdUserObject.id && task.priority === true)
            setFilteredPriority(personalPriority)
        
        }, [tasks])

    return (
      <div onClick={() => navigate("/tasks")} className="notifiedLink">Watchlist
            {
            filteredPriority.length >= 1 ?
        
        <span className="box-notify redBubble">
    
            {filteredPriority.length}
        </span>
        :
        ""
        }
      </div>
    );
};
