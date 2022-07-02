import React from "react";

import ProgressBar from "react-bootstrap/ProgressBar"
import {Col, Container, Row} from "react-bootstrap";
import {Card} from "react-bootstrap";
import {DEBUG} from "../../context/utils";

export default function HostQuestion (props) {
    
    const [results, setResults] = React.useState([])
    const [currentPollId, setCurrentPollId] = React.useState(0)
    const [timer, setTimer] = React.useState(null)

    const getResultsCallback = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/Votes/voteresult?sessionId=${props.sessionId}&pollId=${props.params.id}&closeActivePoll=${props.closeQuestion}`
        
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
            <Container >
                {
                    props.params.options.map((el) => {
                        return (
                            <Row align="left" className={"m-3"} >
                                <Col xs={6}>
                                    <span className={"fs-4"}>
                                        {el.name}:
                                    </span>
                                </Col>
                                <Col xs={6}>
                                    <ProgressBar className={"h-100"} now={ allAnswers !== 0 ? (results[el.id] / allAnswers) * 100 : 0} />
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
        const len = props.params.options.length
        for (let i = 0; i < len - 1; i += 2) {
            const row = <Row>
                <Col className="m-3">
                    <Card border={"primary"} className={"p-2"}>
                        <span className={"fs-3"}>
                            {props.params.options[i].name}
                        </span>
                    </Card>
                </Col>
                <Col className="m-3">
                    <Card border={"primary"} className={"p-2"}>
                        <span className={"fs-3"}>
                            {props.params.options[i + 1].name}
                        </span>
                    </Card>
                </Col>
            </Row>
            
            options.push(row)
        }
        if (len % 2 === 1) {
            const last = <Row>
                <Col className="m-3">
                    <Card border={"primary"} className={"p-2"}>
                        <span className={"fs-3"}>
                            {props.params.options[len - 1].name}
                        </span>
                    </Card>
                </Col>
            </Row>
            options.push(last)
        }
        
        return (
            <Container >
                { options }
            </Container>
        )
    }
    
    React.useEffect(() => {
         if (props.showResults === true) {
             getResultsCallback(props.params.id)   
         }
         
         return () => {
             clearTimeout(timer)
         }
    }, [props.params.id, props.showResults])

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