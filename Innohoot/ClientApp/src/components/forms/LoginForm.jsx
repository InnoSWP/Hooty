import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {UserContext} from "../../context/UserContext";
import {useNavigate} from "react-router";


export function LoginForm(props) {
    
    const [state, setState] = React.useState({
        id: ""
    });
    const navigate = useNavigate();
    
    const userContext = React.useContext(UserContext)
    
    let handleSubmit = (event) => {
        event.preventDefault()
        let url = "https://localhost:7006/Users"
        
        
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "Name": state.id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                userContext.updateUserId(data)
                navigate("/quizlist")
            })
        
        console.log(userContext)
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