import React from "react";
import {UserContext} from "../../context/UserContext";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    
    const getResults = () => {
        let url = `https://localhost:7006/Votes/voteresult?userId=${UserContext.getUserId()}&pollId=${props.params.id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setResults({...data.voteDistribution})
            })
        
        setTimeout(getResults, 1000)
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
        getResults()
    }, [])
    
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