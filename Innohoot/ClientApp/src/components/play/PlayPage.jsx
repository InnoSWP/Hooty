import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from "react-bootstrap/Button"

import WebNavbar from "../WebNavbar";

import {AnswerResponseOptions} from "../../context/utils";
import {v4 as uuidv4} from 'uuid'
import {Spinner} from "react-bootstrap";

export function PlayPage(props) {

    const sessionId = document.location.pathname.replace("/play/", "")

    const poll = React.useRef({
        id: -1,
        name: "",
        options: []
    })
    const [isAnswered, setIsAnswered] = React.useState()
    const [currentAnswer, setCurrentAnswer] = React.useState()
    const timerId = React.useRef(null)
    const [participant, setParticipant] = React.useState(null)
    const participantName = React.useRef(null)
        
    console.log(poll)
    console.log(`isAnswered in render: ${isAnswered}`)

    const getPollCallback = () => {
                let url = `https://localhost:7006/participants/${sessionId}/${participantName.current}`
                fetch(url)
                    .then(res => {
                            console.log(res)
                            if (res.status === 204) {
                                return res.text()
                            } else {
                                return res.json()
                            }
                        },
                        res => {
                            alert(res.text())
                        })
                    .then(data => {
                        if (data.id !== poll.current.id) {
                            console.log(`set to false by getpoll ${data.id} <-> ${poll.current.id}`)
                            
                            if (timerId.current !== null) {
                                clearTimeout(timerId)
                            }

                            console.log(data)
                            setIsAnswered(false)
                            poll.current = {...data}
                            console.log(poll)
                        }
                        timerId.current = setTimeout(getPollCallback, 1000)
                    })
    }

    const submitAnswer = () => {
        let url = `https://localhost:7006/Votes`
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                participantName: participant.name,
                optionId: currentAnswer,
                id: uuidv4(),
                sessionId: sessionId
            })
        })
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
                console.log(data)
                console.log(`set to true by submitanswer`)
                setIsAnswered(true)
            })
    }

    const handleChange = (event) => {
        setCurrentAnswer(event.target.value)
    }

    const handleNameChange = [
        (event) => setParticipant(event.target.value),
        () => {
            participantName.current = participant
            if (getPollCallback !== null) {
                getPollCallback()
            }
        }
    ]

    const renderOptions = () => {
        return (
            <>
                {
                    poll.options?.map((option) => {
                        return (
                            <>
                                <ButtonGroup className="mb-2">
                                    <ToggleButton
                                        key={option.id}
                                        id={option.id}
                                        type="radio"
                                        name={poll.id}
                                        variant={
                                            poll.actionEnum === AnswerResponseOptions.DISPLAY_RESULTS ? 
                                                option.isAnswer === true ? 
                                                    "success"
                                                    :
                                                    "danger"
                                                : 
                                                "outline-primary"
                                        }
                                        value={option.id}
                                        checked={currentAnswer === option.id}
                                        onChange={handleChange}
                                    >
                                        { option.name }
                                    </ToggleButton>
                                </ButtonGroup>
                                <br />
                            </>
                        )
                    })
                }

                { poll.options?.length > 0 ?
                    <Button variant="outline-success" onClick={submitAnswer}>
                        Submit answer
                    </Button> : null
                }
            </>
        )
    }

    const renderQuestion = () => {
        return (
            <Card className="text-center" style={{
                margin: "20px"
            }}>
                {
                    poll.id === -1 ? 
                        <Card.Header>Waiting for first question...</Card.Header>
                        :
                        <>
                            <Card.Header>{poll.name}</Card.Header>
                            <Card.Body>
                                {
                                    isAnswered ?
                                        <>
                                            <Spinner animation={"border"} />
                                            <h3>Waiting for next question...</h3>
                                        </> :
                                        renderOptions()
                                }
                            </Card.Body>
                        </>
                        
                }
                
            </Card>

            // <div>
            //     <h2>{poll.name}</h2>
            //     <div>
            //         {
            //             isAnswered ?
            //                 <h3>Waiting for next question...</h3> :
            //                 renderOptions()
            //         }
            //     </div>
            // </div>
        )
    }

    const renderNameForm = () => {
        return (
            <Card className="text-center" style={{
                margin: "20px"
            }}>
                <Card.Header>Enter the name to enter</Card.Header>
                <Card.Body>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>Name: </InputGroup.Text>
                        <Form.Control
                            id="name-form"
                            type="text"
                            value={participant}
                            onChange={handleNameChange[0]}
                            placeholder="aboba"
                            aria-label="aboba"
                        />
                    </InputGroup>

                    <div className="d-grid gap-2">
                        <Button
                            variant="outline-primary"
                            size="lg"
                            onClick={handleNameChange[1]}
                        >Enter</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <WebNavbar message="🦉 Welcome to Hooty!"></WebNavbar>
            <Container style={{ maxWidth: "1000px" }}>
                {participantName.current === null ?
                    renderNameForm() :
                    renderQuestion()
                }
            </Container>
        </>
    )
}