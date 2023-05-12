import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Notification } from "../home/NotificationBox";


//This is my bootstrap navbar modified for my specific code
export const BootstrapNav = () => {
  const navigate = useNavigate()
  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position: "fixed", top: "0", left: "0", width: "100%", zIndex: "3"}}>
      <Container>
      <Nav.Link href="/"><img style={{width: "40px", height: "40px"}} src={require("../logos/crossyRoad2.png")}/></Nav.Link>
        <Navbar.Brand href="/">
          Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/sightings">Sightings</Nav.Link>
            <Nav.Link href="">{Notification()}</Nav.Link>
            {/* <Nav.Link href="/tasks">Watchlist</Nav.Link> */}
            <Nav.Link href="/postings">Bird Feed</Nav.Link>
            <NavDropdown title="Resources" id="collasible-nav-dropdown">
              <NavDropdown.Item href="https://www.allaboutbirds.org/news/">AllAboutBirds</NavDropdown.Item>
              <NavDropdown.Item href="https://www.audubon.org/birds">
                Audubon
              </NavDropdown.Item>
              <NavDropdown.Item href="https://www.birdlife.org/">BirdLife International</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://wvdnr.gov/wp-content/uploads/2022/12/Birds-of-WV-FINAL-113022.pdf">
                WVDNR Checklist
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="" onClick={() => {
                    localStorage.removeItem("bird_user")
                    navigate("/", {replace: true})}}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

