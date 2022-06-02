import React from "react";

export function Layout(props) {
    
    return (
        <div className={"layout"}>
            {props.children}
        </div>
    )
}