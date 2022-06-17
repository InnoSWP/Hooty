import React from "react";

export default function Input(props) {
    
    // ???
    return (
        <div>
            <label htmlFor={props.name}>{props.name}</label><br/>
            <input type={props.type} id={props.name} name={props.name} className={props.className} value={props.state} onChange={props.changeHandler} />
        </div>
    )
}