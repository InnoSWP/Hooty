import React from "react";
import {LoginForm} from "./forms/LoginForm";

export default function LoginPage(props) {
    
    return (
        <div className={""}>
            <div className={"left-form-wrapper"}>
                <LoginForm formName={"OOO"} submitURL={"/"} />
            </div>
            <div className={"right-form-wrapper"}>
                <LoginForm formName={"AAA"} submitURL={"/"} />
            </div>
        </div>
    )
}