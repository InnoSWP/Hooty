import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {UserContext} from "../../context/UserContext";


export function LoginForm(props) {
    
    const [state, setState] = React.useState({
        id: ""
    });
    
    const userContext = React.useContext(UserContext)
    
    let handleSubmit = (event) => {
        event.preventDefault()
        let url = "/Users"
        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: state.id
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                userContext.updateUserId(data)
            })
    }
    
    let handleChange = (event) => {
        let newState = {
            id: event.target.value
        };
        
        setState(newState);
    }
    
    return (
        <form action="" className={"login-form"} onSubmit={handleSubmit}>
            <div className={"form-wrapper"}>
                <div className={"form-header"}>{props.formName}</div>
                <Input changeHandler={handleChange} type={"text"} name={"name"} state={state.id} />
                <SubmitButton />
            </div>
        </form>
    )
}