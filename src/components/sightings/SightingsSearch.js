import { Binoculars } from "react-bootstrap-icons"
// import { Button } from "bootstrap";


export const SightingsSearch = ({ setterFunction }) => {
    

    
    // function BasicExample() {
    //   return (
    //     <Card style={{ width: '18rem' }}>
    //       <Card.Img variant="top" src="holder.js/100px180" />
    //       <Card.Body>
    //         <Card.Title>Card Title</Card.Title>
    //         <Card.Text>
    //           Some quick example text to build on the card title and make up the
    //           bulk of the card's content.
    //         </Card.Text>
    //         <Button variant="primary">Go somewhere</Button>
    //       </Card.Body>
    //     </Card>
    //   );
    // }
    




    //setterFunction comes from the prop in ProductContainer.js. State is an empty string until filled. This function sets the new state when the user changes the contents of the input
    return<>

    <div>
        <input
        className="searchField" 
        style={{width: "100px", height: "15px", margin: ".5em"}}
        onChange={(changeEvent) => {
            setterFunction(changeEvent.target.value)
        }}
        type="text" 
        placeholder="name of species" /><Binoculars></Binoculars>
    </div>





    </>


}




