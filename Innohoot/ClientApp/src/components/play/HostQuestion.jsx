import React from "react";

import ProgressBar from "react-bootstrap/ProgressBar"
import {Col, Container, Row} from "react-bootstrap";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [currentPollId, setCurrentPollId] = React.useState(0)
    const [timer, setTimer] = React.useState(null)

    const getResultsCallback = () => {
        let url = `https://localhost:7006/Votes/voteresult?sessionId=${props.sessionId}&pollId=${props.params.id}&closeActivePoll=${props.closeQuestion}`
        
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

        return (
            <Container>
                {
                    props.params.options.map((el) => {
                        return (
                            <Row align="left">
                                <Col className="w-25">
                                    <h3>
                                        {el.name}:
                                    </h3>
                                </Col>
                                <Col>
                                    <ProgressBar now={ allAnswers !== 0 ? (results[el.id] / allAnswers) * 100 : 0} />
                                </Col>
                                
                            </Row>
                        )
                    })
                }
            </Container>
        ) 
    }
    
    const mapOptions = () => {
        let options = []
        for (let i = 0; i < props.params.options.length - 1; i += 2) {
            const row = <Row>
                <Col className="m-3">
                    {props.params.options[i].name}
                </Col>
                <Col className="m-3">
                    {props.params.options[i + 1].name}
                </Col>
            </Row>
            
            options.push(row)
        }
        
        return (
            <Container >
                { options }
            </Container>
        )
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
            {
                props.showResults === true ?
                    <div> { mapResults() } </div>
                    :
                    <div>{ mapOptions() }</div>
            }
            
        </div>
    )
}