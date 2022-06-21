import React from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import {UserContext} from "../../context/UserContext";
import {useNavigate} from "react-router";

import Hashes from 'jshashes';


export function LoginForm(props) {
    
    const sha = new Hashes.SHA256
    
    const [state, setState] = React.useState({
        id: ""
    })
    const [isProcessing, setIsProcessing] = React.useState(false)
    const navigate = useNavigate();
    
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
                <SubmitButton /> {isProcessing? <span>Wait...</span> : null}
            </div>
        </form>
    )
}