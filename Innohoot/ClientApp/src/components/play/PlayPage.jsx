import React from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from "react-bootstrap/Button"

import WebNavbar from "../WebNavbar";

import { AnswerResponseOptions } from "../../context/utils";
import { v4 as uuidv4 } from 'uuid'
import { Alert, Spinner } from "react-bootstrap";

export function PlayPage(props) {

    const sessionId = document.location.pathname.replace("/play/", "")

    const [poll, setPoll] = React.useState({
        poll: undefined
    })
    const [results, setResults] = React.useState({
        poll: undefined
    })
    const pollRef = React.useRef(null)
    const [isAnswered, setIsAnswered] = React.useState()
    const [isValidName, setIsValidName] = React.useState(true)
    const [currentAnswer, setCurrentAnswer] = React.useState()
    const timerId = React.useRef(null)
    const [participant, setParticipant] = React.useState(null)
    const participantName = React.useRef(null)

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
                console.log(pollRef)
                const actQuestion = data.find(el => el.actionEnum === AnswerResponseOptions.SUBMIT_VOTE)
                const resQuestion = data.find(el => el.actionEnum === AnswerResponseOptions.DISPLAY_RESULTS)
                console.log(actQuestion)
                console.log(resQuestion)
                console.log(results)

                if (resQuestion !== undefined) {
                    if (resQuestion.chosenOptionId !== null) {
                        console.log("asd")
                        setResults({ ...resQuestion })
                    } else {
                        setResults({
                            poll: undefined
                        })
                    }
                }

                if (pollRef.current === null || actQuestion?.poll?.id !== pollRef.current?.poll?.id) {
                    console.log(`set to false by getpoll ${actQuestion?.poll?.id} <-> ${pollRef.current !== null ? pollRef.current?.poll?.id : null}`)

                    if (timerId.current !== null) {
                        clearTimeout(timerId)
                    }




                    setIsAnswered(false)
                    pollRef.current = { ...actQuestion }
                    setPoll({ ...actQuestion })
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
                participantName: participantName.current,
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
        (event) => {
            setParticipant(event.target.value)
            if (event.target.value.length < 3) {
                setIsValidName(false)
            } else {
                setIsValidName(true)
            }
        },
        () => {
            if (!isValidName || participant.length < 3) {
                setIsValidName(false)
                return
            }
            const url = `https://localhost:7006/Sessions/${sessionId}/newparticipant`
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(participant)
            })
                .then(res => {
                    if (res.ok) {
                        participantName.current = participant
                        if (getPollCallback !== null) {
                            getPollCallback()
                        }
                    } else {
                        res.text()
                            .then(data => {
                                alert(data)
                            })
                    }
                })
        }
    ]

    const renderOptions = () => {
        return (
            <>
                {
                    poll.poll?.options?.map((option) => {
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
                                        {option.name}
                                    </ToggleButton>
                                </ButtonGroup>
                                <br />
                            </>
                        )
                    })
                }

                {poll.poll?.options?.length > 0 ?
                    <Button variant="outline-success" onClick={submitAnswer}>
                        Submit answer
                    </Button> : null
                }
            </>
        )
    }

    const renderResults = () => {
        console.log("render results")
        return (
            <>
                {
                    results.poll?.options?.map((option) => {
                        return (
                            <>
                                <ButtonGroup className="mb-2">
                                    <ToggleButton
                                        key={option.id}
                                        id={option.id}
                                        type="button"
                                        name={poll.id}
                                        variant={
                                            option.isAnswer === true ?
                                                "success"
                                                :
                                                "danger"
                                        }
                                        value={option.id}
                                    >
                                        {option.name}
                                    </ToggleButton>
                                </ButtonGroup>
                                <br />
                            </>
                        )
                    })
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
                    poll.poll === undefined ?
                        results.poll === undefined ?
                            <Card.Header>Waiting for first question...</Card.Header>
                            :
                            <>
                                <Card.Header>{results.poll?.name}</Card.Header>
                                <Card.Body>
                                    {renderResults()}
                                </Card.Body>
                            </>
                        :
                        results.poll === undefined ?
                            <>
                                <Card.Header>{poll.poll?.name}</Card.Header>
                                <Card.Body>
                                    {
                                        isAnswered ?
                                            <>
                                                <Spinner animation={"border"} />
                                                <h3>Waiting for next question...</h3>
                                            </>
                                            :
                                            <>
                                                {renderOptions()}
                                            </>
                                    }
                                </Card.Body>
                            </>
                            :
                            <>
                                <Card.Header>{poll.poll?.name}</Card.Header>
                                <Card.Body>
                                    {
                                        isAnswered ?
                                            <>
                                                <Spinner animation={"border"} />
                                                <h3>Waiting for next question...</h3>
                                            </>
                                            :
                                            <>
                                                {renderOptions()}
                                            </>
                                    }
                                </Card.Body>
                            </>
                }

            </Card>
        )
    }

    const renderNameForm = () => {
        return (
            <Card className="text-center" style={{
                margin: "20px"
            }}>
                <Card.Header>Enter the name to enter</Card.Header>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Text>Name: </InputGroup.Text>
                        <Form.Control
                            id="name-form"
                            type="text"
                            isInvalid={!isValidName}
                            value={participant}
                            onChange={handleNameChange[0]}
                            placeholder="Enter your name"
                            aria-labelledby={"name-describe-text"}
                        />
                    </InputGroup>
                    <InputGroup  className="mb-2">
                        <Form.Text id={"name-describe-text"} muted>
                            must be at least 3 symbols
                        </Form.Text>
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