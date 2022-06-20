import React from "react";
import {UserContext} from "../../context/UserContext";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [currentPollId, setCurrentPollId] = React.useState(0)
    const [timer, setTimer] = React.useState(null)

    const getResultsCallback = () => {
        let url = `https://localhost:7006/Votes/voteresult?sessionId=${props.sessionId}&pollId=${props.params.id}`
        fetch(url)
            .then(
                res => res.json()
            )
            .then(data => {
                setResults({...data.voteDistribution})
                console.log(`${props.params.id} ${data.pollId}`)
                setCurrentPollId(data.pollId)
                let timerId = setTimeout(getResultsCallback, 1000)
                setTimer(timerId)
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
        
        getResultsCallback(props.params.id)
    }, [props.params.id])

    if (props.params.id !== currentPollId && timer !== null) {
        clearTimeout(timer)
        setTimer(null)
    }
    
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