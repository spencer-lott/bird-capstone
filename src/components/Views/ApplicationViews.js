import { Outlet, Route, Routes } from "react-router-dom"
import { SightingsForm } from "../sightings/SightingsForm"
import { TaskList } from "../tasks/TaskList"
import { TaskForm } from "../tasks/TaskForm"
import { SightingsContainer } from "../sightings/SightingsContainer"
import { PostingsList } from "../postings/PostingsList"
import { PostingsForm } from "../postings/PostingsForm"
import { Home } from "../home/Home"

//This function consists of all our routes
export const ApplicationViews = () => {
	return (
        <Routes>

            <Route path="/" element={ 

                <>
                
                    <Outlet />
                </>
            }>
                <Route path="/" element={ <Home /> } />
                <Route path="postings/" element={ <PostingsList /> } />
                <Route path="postings/create" element={ <PostingsForm /> } />
                <Route path="sightings" element={ <SightingsContainer />}/>
                <Route path="sightings/create" element={ <SightingsForm /> } />
                <Route path="tasks" element={ <TaskList /> } />
                <Route path="tasks/create" element={ <TaskForm /> } />
            </Route>
        </Routes>
    )
}