import React from "react";
import HostQuestion from "./HostQuestion";
import { useNavigate } from "react-router";

import WebNavbar from "../WebNavbar"
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import {DEBUG} from "../../context/utils";

import "../../css/App.css";
import { QRCodeSVG } from 'qrcode.react'

export default function HostPage(props) {

    const sessionURL = new URL(document.location)

    const sessionId = sessionURL.pathname.replace("/host/", "")
    const pollCollectionId = sessionURL.searchParams.get("id")
    const code = sessionURL.searchParams.get("code")

    console.log(sessionId)
    console.log(pollCollectionId)
    console.log(code)

    const navigate = useNavigate()

    const [quiz, setQuiz] = React.useState()
    const [shouldCloseQuestionModal, setShouldCloseQuestionModal] = React.useState(false)
    const [resultsModal, setResultsModal] = React.useState(false)
    const [closeQuestion, setCloseQuestion] = React.useState(false)
    const [showResults, setShowResults] = React.useState(false)
    const [currentPollIndex, setCurrentPollIndex] = React.useState(-1)
    const [quizResults, setQuizResults] = React.useState([])
    const [topParticipants, setTopParticipants] = React.useState([])
    const [showTop, setShowTop] = React.useState(false)

    React.useEffect(() => {
        console.log("aboba")
        fetchQuiz()
    }, [])

    const fetchQuiz = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/PollCollections?Id=${pollCollectionId}`
        fetch(url)
            .then(
                res => res.json()
            )
            .then(data => {
                console.log(data)
                setQuiz({ ...data })

                fetchActiveSession()
            })
    }

    const fetchActiveSession = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/Sessions/${sessionId}`
        fetch(url)
            .then(
                res => res.json(),
                res => {
                    alert(res.text())
                })
            .then(data => {
                console.log(data)
                setCurrentPollIndex(quiz.polls.findIndex((poll) => poll.id === data.activePoll))
            })
    }

    const nextPoll = () => {
        let nextPollIndex = currentPollIndex + 1

        if (nextPollIndex === quiz.polls.length) {
            closeSession()
            return
        }

        setCloseQuestion(false)
        setShowResults(false)
        setShouldCloseQuestionModal(false)

        console.log(quiz)
        let nextPollId = quiz.polls[nextPollIndex].id
        console.log(nextPollId)

        let url = (DEBUG ? `https://localhost:7006` : ``) + `/Polls/${nextPollId}/active`
        fetch(url, { method: "PUT" })
            .then(res => {
                setCurrentPollIndex(nextPollIndex)
                console.log(`aaa: ${currentPollIndex}  ${currentPollIndex < 0 ? "-1" : quiz.polls[currentPollIndex].id}`)
            }, res => {
                alert(res.text())
            })
    }

    const getTopParticipants = () => {
        const url = (DEBUG ? `https://localhost:7006` : ``) + `/Votes/Top?sessionId=${sessionId}`

        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.text())
                }
            })
            .then(data => {
                setTopParticipants([...data])
                setShowTop(true)
            })
            .catch(res => {
                alert(res)
            })
    }

    const closeSession = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/Sessions/${sessionId}/close`
        fetch(url, { method: "PUT" })
            .then(res => {
                console.log(res.json())
                exportResults()
                getTopParticipants()
            }, res => {
                alert(res.text())
            })
    }

    const exportResults = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/votes/excel?sessionId=${sessionId}`
        fetch(url)
            .then(res => {
                console.log(res)
                return res.blob()
            })
            .then(data => {
                let file = window.URL.createObjectURL(data);
                window.open(file);
            })
    }

    const getQuizResults = (close) => {
        const url = (DEBUG ? `https://localhost:7006` : ``) + `/Votes/quizresult?sessionId=${sessionId}&pollOrder=${quiz.polls[currentPollIndex].orderNumber}&closeActivePoll=${close}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setQuizResults([...data])

                setResultsModal(true)
            })
    }

    const toggleCloseQuestion = (result) => {
        setCloseQuestion(result)
        setShouldCloseQuestionModal(false)
        toggleShowResults()
    }

    const toggleShowResults = () => {
        setShowResults(!showResults)
    }

    const isPreQuiz = () => {
        return currentPollIndex === -1;
    }

    const isPostQuiz = () => {
        return currentPollIndex === quiz.polls.length - 1;
    }


    const renderQuizResults = () => {

        return quizResults.map((_el) => {
            const poll = quiz.polls.find((poll) => poll.id === _el.pollId)

            const allAnswers = Object.keys(_el.voteDistribution).reduce((prev, curr) => {
                prev += _el.voteDistribution[curr]
                return prev
            }, 0)

            return (
                <Card style={{ margin: "20px" }}>
                    <Card.Header>
                        <span className={"fs-3"}> {poll.name} </span>
                    </Card.Header>
                    <Card.Body className="text-center">
                        <Container>
                            {
                                poll.options.map((el) => {
                                    return (
                                        <Row align="left" className={"m-3"}>
                                            <Col xs={6}>
                                                <span className={"fs-3"}>
                                                    {el.name}:
                                                </span>
                                            </Col>
                                            <Col xs={6}>
                                                <ProgressBar className={"h-100"} variant={el.isAnswer ? "success" : "danger"} now={
                                                    allAnswers !== 0 ? (_el.voteDistribution[el.id] / allAnswers) * 100 : 0
                                                } />
                                            </Col>

                                        </Row>
                                    )
                                })
                            }
                        </Container>
                    </Card.Body>
                </Card>
            )
        })
    }

    const renderTopParticipants = () => {
        return (
            <Container>
                {
                    topParticipants.map(el => {
                        return (
                            <Row align="left" className={"m-3"}>
                                <Col xs={6}>
                                    <span className={"fs-3"}>
                                        {el.key}:
                                    </span>
                                </Col>
                                <Col xs={6}>
                                    <ProgressBar className={"h-100"} now={
                                        quiz.polls?.length !== 0 ? (el.value/ quiz.polls?.length) * 100 : 0
                                    } />
                                </Col>

                            </Row>
                        )
                    })
                }
            </Container>
        )
    }

    return (
        <>
            <Modal show={shouldCloseQuestionModal} onHide={() => setShouldCloseQuestionModal(false)}>
                <Modal.Header closeButton>
                    Stop receiving votes?
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col className={"m-3"}>
                                <Button className={"w-100"} onClick={() => toggleCloseQuestion(true)} variant="success">
                                    Yes
                                </Button>
                            </Col>
                            <Col className={"m-3"}>
                                <Button className={"w-100"} onClick={() => toggleCloseQuestion(false)} variant="danger">
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Container>


                </Modal.Body>
            </Modal>
            <Modal fullscreen={true} show={resultsModal} onHide={() => setResultsModal(false)}>
                <Modal.Header closeButton>
                    Quiz results
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        {renderQuizResults()}
                    </Stack>
                </Modal.Body>
            </Modal>


            <WebNavbar show={true} message="Host Page 🦉 Hooty" />
            <Container style={{ maxWidth: "1000px" }}>
                <Card style={{ margin: "20px" }}>
                    <Card.Header>
                        <Stack direction={"horizontal"} gap={3}>
                            {
                                isPreQuiz() ?
                                    <Button
                                        onClick={nextPoll}
                                        variant="outline-success">Start quiz</Button>
                                    :
                                    <Button
                                        onClick={nextPoll}
                                        variant="outline-success">
                                        {
                                            isPostQuiz() ?
                                                <>Close session</>
                                                :
                                                <>Next question</>
                                        }
                                    </Button>
                            }

                            {
                                isPreQuiz() ?
                                    <></>
                                    :
                                    <>
                                        <div className={"vr"} />
                                        <Button
                                            onClick={() => {
                                                showResults === true ?
                                                    toggleShowResults()
                                                    :
                                                    setShouldCloseQuestionModal(true)
                                            }}
                                            variant="outline-primary"
                                        >
                                            {
                                                showResults === true ?
                                                    "Hide results"
                                                    :
                                                    "Show results"
                                            }
                                        </Button>

                                        <Button
                                            onClick={() => getQuizResults(false)}
                                            variant="outline-primary"
                                        >
                                            Show quiz results
                                        </Button></>
                            }
                        </Stack>
                    </Card.Header>

                    <Card.Body className="text-center">
                        {
                            showTop === true ?
                                <>
                                    <h1>Top</h1>
                                    {renderTopParticipants()}
                                </>
                                :
                                isPreQuiz() ?
                                    <>
                                        <a href={`/play/${sessionId}`}>
                                            {<h1>Code: {code}</h1>}
                                        </a>
                                        <QRCodeSVG value={
                                            (DEBUG ? 
                                                `https://localhost:44402` 
                                                :
                                                `https://hootywebapp.azurewebsites.net`) + `/play/${sessionId}`
                                        } />
                                    </>
                                    
                                    :
                                    <HostQuestion showResults={showResults} closeQuestion={closeQuestion} params={quiz.polls[currentPollIndex]} sessionId={sessionId} />
                        }
                    </Card.Body>

                    <Card.Footer className="text-center text-muted" />
                </Card>
            </Container>
        </>
    )
}