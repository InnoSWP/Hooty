import React from "react";

export default function PreQuiz(props) {
    
    return (
        <div>
            <h1>Code: {props.code}</h1>
            <button  onClick={props.nextPoll}>Play</button>
        </div>
    )
}