import React from "react";
import {UserContext} from "../../context/UserContext";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [timer, setTimer] = React.useState(null)
    
    const getResultsCallback = React.useCallback(() => {
        console.log(props.params)
        let url = `https://localhost:7006/Votes/voteresult?userId=${UserContext.getUserId()}&pollId=${props.params.id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults({...data.voteDistribution})
            })
    }, [props.params.id, UserContext])
    
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
        if (timer !== null) {
            clearInterval(timer)
        }
        let newTimer = setInterval(getResultsCallback, 1000)
        setTimer(newTimer)
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