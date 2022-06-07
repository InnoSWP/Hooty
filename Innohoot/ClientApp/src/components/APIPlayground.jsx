import React from "react";

export default function APIPlayground(props) {
    
    const [result, setResult] = React.useState("");
    
    
    const requestData = (url, details) => {
        const parsedDetails = {
            method: details.method? details.method : "GET",
            body: details.body? details.body : {},
            contentType: details.contentType? details.contentType : "application/json;charset=utf-8"
        }
        
        fetch(url, parsedDetails.method === "POST" ? {
            method: parsedDetails.method,
            headers: {
                "Content-Type": parsedDetails.contentType
            },
            body: JSON.stringify(parsedDetails.body)
        } : {})
            .then(
                (result) => {return result.text()},
                (err) =>  {return err}
            )
            .then(
                (data) => {setResult(data)}, 
                (err) => {setResult(err)}
            );
    }
    
    return (
        <div style={{border: "1px solid black", padding: "10px", width: "500px"}}>
            <h3>{props.name}</h3>
            <div>
                <button onClick={() => requestData(props.url, props.details)}>Request</button>
            </div>
            <textarea style={{width: "100%"}} name="" id="" cols="30" rows="10" value={result} readOnly={true}></textarea>
        </div>
    )
}