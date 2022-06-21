import React from "react";
import {UserContext} from "../../context/UserContext";

import ProgressBar from "react-bootstrap/ProgressBar"

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [currentPollId, setCurrentPollId] = React.useState(0)
    const [timer, setTimer] = React.useState(null)

    const getResultsCallback = () => {
        let url = `https://localhost:7006/Votes/voteresult?sessionId=${props.sessionId}&pollId=${props.params.id}`
        fetch(url)
            .then(res => {
                    if (!res.ok) {
                        res.text()
                            .then(data => {
                                alert(data)
                                throw new Error(data)
                            })
                    } else {
                        return res.json()
                    }
                },
                res => {
                    alert(res.text())
                })
            .then(data => {
                setResults({...data.voteDistribution})
                console.log(`${props.params.id} ${data.pollId}`)
                setCurrentPollId(data.pollId)
                let timerId = setTimeout(getResultsCallback, 1000)
                setTimer(timerId)
            })

    }

    const countAllAnswers = () => {
        return Object.keys(results).reduce((prev, curr) => {
            prev += results[curr]
            return prev
        }, 0)

    }
    
    const mapResults = () => {
        let allAnswers = countAllAnswers()

        return props.params.options.map((el) => {
            return (
                <div align="left">
                    <h3>{el.name}: </h3>
                    <ProgressBar now={ (results[el.id] / allAnswers) * 100} />
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
            <h1> { props.params.name } </h1>
            <div> { mapResults() } </div>
        </div>
    )
}