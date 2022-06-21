import React from "react";
import {UserContext} from "../../context/UserContext";
import {LoginForm} from "./LoginForm";

export function LoginPage(props) {
    
        return (
            <div style={{
                padding: "20px"
            }}>
                <p>Your id: {UserContext.getUserId()}</p>
                <LoginForm formName={"Login"} userContext={props.userContext} url={"https://localhost:7006/Users/login"} />
                <LoginForm formName={"Create user"} userContext={props.userContext} url={"https://localhost:7006/Users"} />
            </div>

        );
}