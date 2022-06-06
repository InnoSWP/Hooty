import React from "react";

export default function Input(props) {
    
    // ???
    return (
        <input type={props.type} name={props.name} className={props.className} value={props.state} onChange={props.changeHandler} />
    )
}