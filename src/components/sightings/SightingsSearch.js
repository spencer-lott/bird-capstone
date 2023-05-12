import { BinocularsFill } from "react-bootstrap-icons"
import "./Sightings.css"

//This function is the input field for the bird search
export const SightingsSearch = ({ setterFunction }) => {

    return<>
        <div className="searchField">
            <div style={{marginLeft: "0.33em", fontWeight: "bold"}}>Bird Search</div>
            <input
            className="searchInput" 
            onChange={(changeEvent) => {setterFunction(changeEvent.target.value)}}
            type="text" 
            placeholder="name of species..." /><BinocularsFill style={{color: "black", fontSize: "2.25em", paddingBottom: "4px"}}></BinocularsFill>
        </div>
    </>
}