import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {UserContext} from "../../context/UserContext";
import {useNavigate} from "react-router";

import { Hashes } from 'jshashes';


export function LoginForm(props) {
    
    const sha = new Hashes.SHA256()
    
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
        
        setState({...newState});
    }
    
    let handlePasswordChange = (event) => {
        let newState = state
        newState.password = event.target.value
        
        setState({...newState})
    }
    
    return (
        <form action="" className={"login-form"} onSubmit={handleSubmit}>
            <div className={"form-wrapper"}>
                <div className={"form-header"}>{props.formName}</div>
                <Input changeHandler={handleNameChange} type={"text"} name={"name"} state={state.name} />
                <Input changeHandler={handlePasswordChange} type={"password"} name={"password"} state={state.password} />
                <SubmitButton />
            </div>
        </form>
    )
}