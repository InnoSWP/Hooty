import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

export function LoginForm(props) {
    
    const [state, setState] = React.useState({
        login: "",
        password: ""
    });
    
    let handleSubmit = (event) => {
        // TODO: AUTH to backend
    }
    
    let handleChange = (event) => {
        let newState = {
            login: event.target.name === "login" ? event.target.value : state.login,
            password: event.target.name === "password" ? event.target.value : state.password
        };
        
        setState(newState);
    }
    
    return (
        <form action="" className={"login-form"} onSubmit={handleSubmit}>
            <div className={"form-wrapper"}>
                <div className={"form-header"}>{props.formName}</div>
                <Input changeHandler={handleChange} type={"text"} name={"login"} state={state.login} />
                <Input changeHandler={handleChange} type={"password"} name={"password"} state={state.password} />
                <SubmitButton />
            </div>
        </form>
    )
}