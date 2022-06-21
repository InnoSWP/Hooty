import React from "react";
import {useNavigate} from "react-router";

export default function PlayCodePage() {
    
    const [code, setCode] = React.useState("")
    const navigate = useNavigate()

    const handleCodeChange = (event) => {
        setCode(event.target.value)
    } 
    
    const getSessionId = () => {
        let url = `https://localhost:7006/Sessions/${code}`
        
        fetch(url)
            .then(res => res.json(), res => alert(res))
            .then(data => {
                navigate(`/play/${data.id}`)
            })
    }
    
    return (
        <div>
            <label htmlFor="code-form">
                Code:
                <input type="text"
                       id="code-form"
                       value={code}
                       onChange={handleCodeChange}
                />
            </label>
            <button onClick={getSessionId}>Save</button>
        </div>
    )
}