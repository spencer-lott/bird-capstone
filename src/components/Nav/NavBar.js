import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
  return (
    <nav className="navbar">

      <ul className="nav">
      <li className="nav-item">
          <Link className="nav-link" to="/">Bulletin Board</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/sightings">Sightings</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tasks">Birds To See</Link>
        </li>

        <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("bird_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
      </ul>
    </nav>
  )
}

