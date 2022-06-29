import React from "react";
import HostQuestion from "./HostQuestion";
import {useNavigate} from "react-router";

import WebNavbar from "../WebNavbar"

import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import "../../css/App.css";
import {Col, Modal, Row, Stack} from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

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
    
    React.useEffect(() => {
        console.log("aboba")
        fetchQuiz()
    }, [])
    
    const fetchQuiz = () => {
        let url = `https://localhost:7006/PollCollections?Id=${pollCollectionId}`
        fetch(url)
            .then(
                res => res.json()
            )
            .then(data => {
                console.log(data)
                setQuiz({...data})
                
                fetchActiveSession()
            })
    }
    
    const fetchActiveSession = () => {
        let url = `https://localhost:7006/Sessions/${sessionId}`
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
        
        let url = `https://localhost:7006/Polls/${nextPollId}/active`
        fetch(url, {method: "PUT"})
            .then(res => {
                setCurrentPollIndex(nextPollIndex)
                console.log(`aaa: ${currentPollIndex}  ${ currentPollIndex < 0? "-1" : quiz.polls[currentPollIndex].id}`)
            }, res => {
                alert(res.text())
            })
    }
    
    const closeSession = () => {
        let url = `https://localhost:7006/Sessions/${sessionId}/close`
        fetch(url, {method: "PUT"})
            .then(res => {
                console.log(res.json())
                exportResults()
                navigate("/quizlist")
            }, res => {
                alert(res.text())
            })
    }
    
    const exportResults = () => {
        let url = `https://localhost:7006/votes/excel?sessionId=${sessionId}`
        fetch(url)
            .then(res => {
                console.log(res)
                return res.blob()
            })
            .then(data => {
                let file = window.URL.createObjectURL(data);
                window.location.assign(file);
            })
    }
    
    const getQuizResults = (close) => {
        const url = `https://localhost:7006/Votes/quizresult?
                        sessionId=${sessionId}&
                        pollOrder=${quiz.polls[currentPollIndex].pollNumber}&
                        closeActivePoll=${close}`
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setQuizResults({...data})
                
                setResultsModal(true)
            })
    }
    
    const toggleCloseQuestion = (result) => {
        setCloseQuestion(result)
        toggleShowResults()
    }
    
    const toggleShowResults = () => {
        setShowResults(!showResults)
    }
    
    const isPreQuiz = () => {
        return currentPollIndex === -1;
    }
    
    const renderQuizResults = () => {
        
        return quizResults.map((_el) => {
            const poll = quiz.polls.find((poll) => poll.id === _el.id)

            const allAnswers = Object.keys(_el.voteDistribution).reduce((prev, curr) => {
                    prev += _el.voteDistribution[curr]
                    return prev
                }, 0)
            
            return (
                <Card style={{ margin: "20px" }}>
                    <Card.Header>
                        <h1> { poll.name } </h1>
                    </Card.Header>
                    <Card.Body className="text-center">
                        <Container>
                            {
                                poll.options.map((el) => {
                                    return (
                                        <Row align="left">
                                            <Col className="w-25">
                                                <h3>
                                                    {el.name}:
                                                </h3>
                                            </Col>
                                            <Col>
                                                <ProgressBar now={ 
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
    
    return (
        <>
            <Modal show={shouldCloseQuestionModal} onHide={toggleShowResults}>
                <Modal.Header closeButton>
                    Stop receiving votes?
                </Modal.Header>
                <Modal.Body>
                    <Button onClick={() => toggleCloseQuestion(true)} variant="success">
                        Yes
                    </Button>
                    <Button onClick={() => toggleCloseQuestion(false)} variant="danger">
                        No
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={resultsModal} onHide={() => setResultsModal(false)}>
                <Modal.Header closeButton>
                    Quiz results
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        { renderQuizResults() }
                    </Stack>
                </Modal.Body>
            </Modal>
            <WebNavbar message="Host Page 🦉 Hooty"></WebNavbar>
            <Container style={{ maxWidth: "1000px" }}>
                <Card style={{ margin: "20px" }}>
                    <Card.Header>
                        { isPreQuiz() ?
                            <Button
                                onClick={nextPoll}
                                variant="outline-success">Start quiz</Button>
                                :
                            <Button
                                onClick={nextPoll}
                                variant="outline-primary">
                                {
                                    currentPollIndex === quiz.polls.length - 1 ? 
                                        <>Close session</> 
                                        :
                                        <>Next question</>
                                }
                            </Button>
                        }
                        <Button
                            onClick={toggleShowResults}
                            variant="outline-primary">
                            {
                                showResults === true ? 
                                    "Hide results"
                                    :
                                    "Show results"
                            }
                        </Button>
                    </Card.Header>

                    <Card.Body className="text-center">
                        { isPreQuiz() ?
                            <a href={`https://localhost:44402/play/${sessionId}`}>
                                { <h1>Code: {code}</h1> }
                            </a>
                            :
                            <HostQuestion showResults={showResults} closeQuestion={closeQuestion} params={quiz.polls[currentPollIndex]} sessionId={sessionId} />
                        }
                    </Card.Body>
                    
                    <Card.Footer className="text-center text-muted"></Card.Footer>
                </Card>
            </Container>
        </>
    )
}