import { Binoculars } from "react-bootstrap-icons"


export const SightingsSearch = ({ setterFunction }) => {
    

    




    //setterFunction comes from the prop in ProductContainer.js. State is an empty string until filled. This function sets the new state when the user changes the contents of the input
    return<>

    <div>
        <input
        className="searchField" 
        style={{width: "150px", height: "25px", margin: ".5em"}}
        onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value)
        }}
        type="text" 
        placeholder="name of species" /><Binoculars></Binoculars>
    </div>
    </>


}




