import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



// export const NavBar = () => {
//   const navigate = useNavigate()
//   return (
//     <nav className="navbar">

//       <ul className="nav">
//       <li className="nav-item">
//           <Link className="nav-link" to="/">Bulletin Board</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/sightings">Sightings</Link>
//         </li>
//         <li className="nav-item">
//           <Link className="nav-link" to="/tasks">Birds To See</Link>
//         </li>

//         <li className="navbar__item navbar__logout">
//                 <Link className="navbar__link" to="" onClick={() => {
//                     localStorage.removeItem("bird_user")
//                     navigate("/", {replace: true})
//                 }}>Logout</Link>
//             </li>
//       </ul>
//     </nav>
//   )
// }


export const BootstrapNav = () => {
  const navigate = useNavigate()
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Bulletin Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/sightings">Sightings</Nav.Link>
            <Nav.Link href="/tasks">Birds To See</Nav.Link>
            <NavDropdown title="Resources" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Resource 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Resource 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Resource 3</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">About</Nav.Link>
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

