import React from "react";
import {LoginForm} from "./forms/LoginForm";
import {UserContext} from "../context/UserContext";

export function LoginPage(props) {
    
        return (
            <div style={{
                padding: "20px"
            }}>
                <p>Your id: {UserContext.getUserId()}</p>
                <LoginForm formName={"Login"} userContext={props.userContext} />
            </div>

        );
}