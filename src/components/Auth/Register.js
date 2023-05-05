import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("bird_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = {...customer}
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
    }

    return (
        <>
    < main className="loginContainer" style={{backgroundColor: "#f2ffe8"}}>
            <Form style={{width: "25%", marginLeft: "37%", paddingTop: "8%", paddingBottom: "35%"}} 
                onSubmit={handleRegister}
                >
                <h1 className="loginHeader" style={{display: "flex", justifyContent: "center", fontSize: "3em", textAlign: "end"}}>Please Register for Bird Bud</h1>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Full name</Form.Label>
                        <Form.Control type="name"
                                    onChange={updateCustomer} 
                                    placeholder="Enter full name"
                                    required autoFocus />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email"
                                    onChange={updateCustomer} 
                                    placeholder="Enter email"
                                    required autoFocus />
                    </Form.Group>


                    <Button style={{
                            transition: "all 0.3s ease-out",
                            backgroundColor: "#355e3b"
                            }} 
                            type="submit">
                        Register
                    </Button>
            </Form>
        </main>
    
    
        </>
    )
}


// original
{/* <main style={{ textAlign: "center" }}>
<form className="form--login" onSubmit={handleRegister}>
    <h1 className="h3 mb-3 font-weight-normal">Please Register for Nutshell</h1>
    <fieldset>
        <label htmlFor="fullName"> Full Name </label>
        <input onChange={updateCustomer}
               type="text" id="fullName" className="form-control"
               placeholder="Enter your name" required autoFocus />
    </fieldset>
    <fieldset>
        <label htmlFor="email"> Email address </label>
        <input onChange={updateCustomer}
            type="email" id="email" className="form-control"
            placeholder="Email address" required />
    </fieldset>
    <fieldset>
        <button type="submit"> Register </button>
    </fieldset>
</form>
</main> */}