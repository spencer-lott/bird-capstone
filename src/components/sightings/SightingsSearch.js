import { BinocularsFill } from "react-bootstrap-icons"
import "./Sightings.css"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"

export const SightingsSearch = ({ setterFunction }) => {
    const navigate = useNavigate()

    return<>


    <div className="searchField">
        <div style={{marginLeft: "0.33em", color: "white"}}>Bird Search</div>
        <input
        className="searchInput" 
        // style={{width: "150px", height: "25px", margin: ".5em"}}
        onChange={(changeEvent) => {setterFunction(changeEvent.target.value)}}
        type="text" 
        placeholder="name of species..." /><BinocularsFill style={{color: "black", fontSize: "2.25em", paddingBottom: "4px"}}></BinocularsFill>



    </div>

    </>


}




