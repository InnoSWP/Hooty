import React from "react";
import {LoginForm} from "./forms/LoginForm";

export function LoginPage(props) {
    
        return (
            <div style={{
                padding: "20px"
            }}>
                <LoginForm formName={"Login"} userContext={props.userContext} />
            </div>

        );
}