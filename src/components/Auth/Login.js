import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Button, Form} from "react-bootstrap";
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("sergeantduck5@disney.org")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("bird_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (< main className="loginContainer" style={{backgroundColor: "#f2ffe8", paddingTop: "8%", paddingBottom: "35%"}}>
            <div id="pictureframe">
                <div id="bird">
                    <div id="body2"></div>
                    <div id="body1"></div>
                    <div id="wing-l"></div>  
                    <div id="wing-r"></div>  
                </div>
                <div id="shadow"></div>
            </div>

            <Form style={{width: "25%", marginLeft: "37%" }} 
                onSubmit={handleLogin}>
                <h1 className="loginHeader" style={{display: "flex", justifyContent: "center", fontSize: "5em"}}>Bird Bud</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                    value={email}
                                    onChange={evt => set(evt.target.value)} 
                                    placeholder="Enter email"
                                    required autoFocus />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Text style={{display: "flex", justifyContent: "flex-end"}}>
                            <Link to="/register">Need to Register?</Link>
                        </Form.Text>
                    </Form.Group>
                    <Button style={{
                            transition: "all 0.3s ease-out",
                            backgroundColor: "#355e3b",
                            border: "solid #39545f 0.5px"
                            }}  
                            type="submit">
                        Login
                    </Button>
            </Form>

        </main>
    )
}

// marginTop: "8%"