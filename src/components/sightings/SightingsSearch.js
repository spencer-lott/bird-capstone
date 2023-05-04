import { BinocularsFill } from "react-bootstrap-icons"
import "./Sightings.css"

export const SightingsSearch = ({ setterFunction }) => {

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




