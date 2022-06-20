import React from "react";
import SubmitButton from "./SubmitButton";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

import Hashes from 'jshashes';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function LoginForm(props) {
    const sha = new Hashes.SHA256

    const [state, setState] = React.useState({
        id: ""
    });
    const navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault()
        let url = "https://localhost:7006/Users"

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "Login": state.name,
                "PasswordHash": sha.hex(state.password)
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                UserContext.setUserId(data)

                navigate("/quizlist")
                console.log(UserContext.getUserId())
            })
    }

    let handleNameChange = (event) => {
        let newState = state
        newState.name = event.target.value

        setState({ ...newState });
    }

    let handlePasswordChange = (event) => {
        let newState = state
        newState.password = event.target.value

        setState({ ...newState })
    }

    return (
        <>
            <form action="" className={"login-form"} onSubmit={handleSubmit}>
                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={handleNameChange}
                        state={state.name}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <Form.Control
                        placeholder="Password"
                        aria-label="Password"
                        type="password"
                        aria-describedby="basic-addon1"
                        onChange={handlePasswordChange}
                        state={state.password}
                    />
                </InputGroup>

                <div className="d-grid gap-2">
                    <SubmitButton variant="primary" size="lg"/>
                </div>
            </form>
        </>
    );
}