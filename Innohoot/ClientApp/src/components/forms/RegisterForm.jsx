import React from "react";
import SubmitButton from "./SubmitButton";
import {UserContext} from "../../context/utils";
import {useNavigate} from "react-router";

import Hashes from 'jshashes';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Spinner} from "react-bootstrap";

export function RegisterForm(props) {
    const sha = new Hashes.SHA256

    const [state, setState] = React.useState({
        name: "",
        password: ""
    })
    const [isProcessing, setIsProcessing] = React.useState(false)
    const [isValid, setIsValid] = React.useState(true)

    const navigate = useNavigate()

    let handleSubmit = (event) => {
        event.preventDefault()
        if (state.password === "") {
            alert("Password is required")
            setIsValid(false)
        } else if (state.password !== state.passwordrepeat) {
            setIsValid(false)
            alert("Passwords do not match")
        } else {
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
                    setIsValid(true)

                    UserContext.setUserId(data.slice(1, -1))
                    navigate("/quizlist")
                    console.log(UserContext.getUserId())
                }).catch((reason) => {
                setIsProcessing(false)
                alert(reason)
            })
        }
    }

    let handleNameChange = (event) => {
        let newState = state
        newState.name = event.target.value

        setState({...newState});
    }

    let handlePasswordChange = (event) => {
        let newState = state
        newState.password = event.target.value

        setState({...newState})
    }

    let handlePasswordRepeatChange = (event) => {
        let newState = state
        newState.passwordrepeat = event.target.value

        setState({...newState})
    }

    return (
        <>
            <form action="" className={"login-form"} onSubmit={handleSubmit}>
                <h3>{props.label}</h3>

                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        isInvalid={!isValid}
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
                        isInvalid={!isValid}
                        type="password"
                        aria-describedby="basic-addon1"
                        onChange={handlePasswordChange}
                        state={state.password}
                    />
                </InputGroup>

                <InputGroup className="mb-2">
                    <InputGroup.Text id="basic-addon2"></InputGroup.Text>
                    <Form.Control
                        placeholder="Repeat password"
                        aria-label="Repeat password"
                        isInvalid={!isValid}
                        type="password"
                        aria-describedby="basic-addon1"
                        onChange={handlePasswordRepeatChange}
                        state={state.passwordrepeat}
                    />
                </InputGroup>

                <div className="d-grid gap-2">
                    <SubmitButton
                        disabled={isProcessing}
                        label={
                            isProcessing ?
                                <>
                                    <Spinner animation={"border"} size={"sm"}/>
                                </>
                                :
                                props.label
                        } variant="primary" size="lg"/>
                </div>
            </form>
        </>
    );
}