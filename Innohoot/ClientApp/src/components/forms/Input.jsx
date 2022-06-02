import React from "react";

export function Input(props) {
    
    // ???
    return (
        <input type={props.type} name={props.name} className={props.className} value={props.state} onChange={props.changeHandler} />
    )
}