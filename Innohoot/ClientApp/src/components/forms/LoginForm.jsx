import React from "react";
import SubmitButton from "./SubmitButton";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

import Hashes from 'jshashes';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FetchSpinner from "../FetchSpinner";

export function LoginForm(props) {
    const sha = new Hashes.SHA256

    const [state, setState] = React.useState({
        id: ""
    })
    const [isProcessing, setIsProcessing] = React.useState(false)
    const navigate = useNavigate()

    let handleSubmit = (event) => {
        event.preventDefault()
        let url = `${props.url}`
        
        setIsProcessing(true)
        
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
            .then(async (res) => {
                let text = res.text()
                if (res.ok) {
                    return text
                }
                return Promise.reject(await text)
            })
            .then(data => {
                console.log(data)
                setIsProcessing(false)
                
                UserContext.setUserId(data.slice(1, -1))
                navigate("/quizlist")
                console.log(UserContext.getUserId())
            }).catch((reason) => {
                setIsProcessing(false)
                alert(reason)
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
            <FetchSpinner status={isProcessing} />
            <form action="" className={"login-form"} onSubmit={handleSubmit}>
                <h3>{props.label}</h3>

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
                    <SubmitButton label={props.label} variant="primary" size="lg"/>
                </div>
            </form>
        </>
    );
}