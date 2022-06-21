import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Button from "react-bootstrap/Button"

import WebNavbar from "../WebNavbar";

import { v4 as uuidv4 } from 'uuid'

export function PlayPage(props) {

    const sessionId = document.location.pathname.replace("/play/", "")

    const [poll, setPoll] = React.useState({
        id: 0,
        name: "",
        options: []
    })
    const [isAnswered, setIsAnswered] = React.useState()
    const [currentAnswer, setCurrentAnswer] = React.useState()
    const [participant, setParticipant] = React.useState({
        name: null,
        buffer: ""
    })

    const getPoll = () => {
        let url = `https://localhost:7006/polls/active?sessionId=${sessionId}`
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
                console.log(data)
                if (data.id !== poll.id) {
                    setIsAnswered(false)
                    setPoll({ ...data })
                }
                setTimeout(getPoll, 1000)
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
                setIsAnswered(true)
            })
    }

    const handleChange = (event) => {
        setCurrentAnswer(event.target.value)
    }

    const handleNameChange = [
        (event) => setParticipant({
            name: participant.name,
            buffer: event.target.value
        }),
        () => {
            setParticipant({
                name: participant.buffer,
                buffer: participant.buffer
            })
            getPoll()
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
                                        variant="outline-primary"
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
                <Card.Header>{poll.name}</Card.Header>
                <Card.Body>
                    {
                        isAnswered ?
                            <h3>Waiting for next question...</h3> :
                            renderOptions()
                    }
                </Card.Body>
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
                            value={participant.buffer}
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
                {participant.name === null ?
                    renderNameForm() :
                    renderQuestion()
                }
            </Container>
        </>
    )
}