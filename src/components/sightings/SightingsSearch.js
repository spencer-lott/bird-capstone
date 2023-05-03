import { BinocularsFill } from "react-bootstrap-icons"

export const SightingsSearch = ({ setterFunction }) => {

    return<>

    <div>
        <input
        className="searchField" 
        style={{width: "150px", height: "25px", margin: ".5em"}}
        onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value)
        }}
        type="text" 
        placeholder="name of species" /><BinocularsFill></BinocularsFill>
    </div>
    </>


}




