import React from "react";
import {UserContext} from "../../context/UserContext";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [timer, setTimer] = React.useState(null)
    
    const getResultsCallback = () => {
        console.log(props.params)
        let url = `https://localhost:7006/Votes/voteresult?sessionId=${props.sessionId}&pollId=${props.params.id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults({...data.voteDistribution})
                setTimeout(getResultsCallback, 1000)
            })
    }
    
    const mapResults = () => {
        return props.params.options.map((el) => {
            return (
                <div>
                    <span>{el.name}: </span>
                    <span>{results[el.id]}</span>
                </div>
            )
        })
    }
    
    React.useEffect(() => {
        getResultsCallback()
    }, [props.params.id])
    
    return (
        <div>
            <h2>{props.params.name}</h2>
            <button onClick={props.nextPoll}>Next</button>
            <div>
                {mapResults()}
            </div>
        </div>
    )
}