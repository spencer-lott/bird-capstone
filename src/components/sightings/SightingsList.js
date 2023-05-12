import { useState, useEffect } from "react"
import { Sightings } from "./Sightings"
import { SightingsTable } from "./SightingsTable"
import { OverlayTrigger, Tooltip, Table, Button } from "react-bootstrap"
import "./Sightings.css"

//This function's purpose is to display all the sightings on one page
export const SightingsList = ({ searchTermState }) => {
    const [sightings, setSightings] = useState([])
    const [filteredSightings, setFiltered] = useState([])
    const [birdCount, setBirdCount] = useState([])
    const [showTable, setShowTable] = useState(false)

    const localBirdUser = localStorage.getItem("bird_user")
    const birdUserObject = JSON.parse(localBirdUser)

    //Observing state of the sightings. We filter for the sightings of the user, then filter by species. It will only pull up species that start with that letter. They can be uppercase or lowercase
    useEffect(() => {
        const searchedSightings = sightings.filter(sighting => sighting.userId === birdUserObject.id).filter(sighting => {
            return sighting.species.toLowerCase().startsWith(searchTermState.toLowerCase())
        })
        setFiltered(searchedSightings)
    
    },
    [searchTermState]
    )

    useEffect(() => {
        fetch(`http://localhost:8088/sightings`)
        .then(response => response.json())
        .then((sightingsArray) => {
            setSightings(sightingsArray)
        })
    }, [])

    //Filters the tasks and displays the ones for that user and displays the most recent sighting at the very top
    useEffect(
        () => {
            const personalSightings = sightings.filter(sighting => sighting.userId === birdUserObject.id).sort((a, b) => new Date(b.dateSeen) - new Date(a.dateSeen))
                setFiltered(personalSightings)
        },
        [sightings]
    )

    //Filters all sightings, giving only the ones for the user specifically
    useEffect(
        () => {
            const number = sightings.filter(sighting => sighting.userId === birdUserObject.id)
                setBirdCount(number)
        },
        [sightings]
    )

    //This function switches the user from picture view to a table view. If the button is pressed again, then it will show the icons. It basically hides one and shows the other onclick.
    const SwitchView = () => {
        setShowTable(!showTable)
    }

return <>
        <article className="birdCount">
            <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Total Bird Count</Tooltip>}
            >
            <section className="countNumber">{birdCount.length}</section>
            </OverlayTrigger>
            <p style={{fontStyle: "italic",
        fontWeight: "bold"}}>(Double click an image to edit any of your sightings!)</p>
        </article>

    {showTable ?
        <article className="tableView">
            <Button onClick={SwitchView}
                    style={{
                    marginLeft: "3%",
                    marginBottom: "1%",
                    transition: "all 0.3s ease-out",
                    backgroundColor: "black",
                    border: "solid #39545f 0.5px",
                    opacity: "0.7"}}>
                        Picture view 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
            </Button>

            <article className="table">
            <Table style={{backgroundColor:"whiteSmoke"}} striped bordered hover>
            <thead>
                <tr>
                <th>Species</th>
                <th>Spotted</th>
                <th>Description</th>
                <th>Location</th>
                </tr>
            </thead>
                {filteredSightings.map(sighting => {
                    return <SightingsTable key={sighting.id} sightingTableProp={sighting} updateTableSightings={setSightings}/>
                })}
            </Table>
            </article>
        </article>
            :
        <article>
            <Button onClick={SwitchView}
                    style={{
                    marginLeft: "3%",
                    marginBottom: "1%",
                    transition: "all 0.3s ease-out",
                    backgroundColor: "black",
                    border: "solid #39545f 0.5px",
                    opacity: "0.7"}}>
                        List View 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
            </Button>
            <section className="sightingsCardsContainer">
                    {filteredSightings.map(sighting => {
                    return <Sightings key={sighting.id} sightingProp={sighting} updateSightings={setSightings}/>
                })}
            </section >
        </article>
}

</>
    
}