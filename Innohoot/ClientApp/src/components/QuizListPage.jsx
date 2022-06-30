import React from "react";
import Quiz from "./quizzes/Quiz";

import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../context/utils";
import WebNavbar from "./WebNavbar";

import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

import "../css/App.css";
import FetchSpinner from "./FetchSpinner";

export default function QuizListPage(props) {
    const [quizList, setQuizList] = React.useState([])
    const [isProcessing, setIsProcessing] = React.useState(false)
    
    React.useEffect(() => {
        let url = `https://localhost:7006/Users/PollCollections?Id=${UserContext.getUserId()}`
        
        setIsProcessing(true)

        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                let mappedQuizList = data.map((pollCollectionDTO) => {
                    return {
                        uuid: pollCollectionDTO.id,
                        quiz_name: pollCollectionDTO.name,
                        questions: pollCollectionDTO.polls.map((pollDTO) => {
                            return {
                                uuid: pollDTO.id,
                                question_text: pollDTO.name,
                                answers: pollDTO.options.map((option) => {
                                    return {
                                        uuid: option.id,
                                        answer_text: option.name,
                                        correct: option.isAnswer
                                    }
                                })
                            }
                        })
                    }
                })
                setIsProcessing(false)
                setQuizList([...mappedQuizList])
                
            })
    }, [])

    const renderQuizList = () => {
        return quizList.map(
            (quiz) => <Quiz params={quiz} changeHandler={handleChange} key={quiz.uuid} deleteHandler={deleteQuiz} submit={submitUpdate} />
        )
    }

    const handleChange = (quiz) => {
        let newQuizList = quizList
        let index = newQuizList.findIndex((el) => el.uuid === quiz.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }

        newQuizList[index] = quiz
        setQuizList([...newQuizList])
    }

    const addQuiz = () => {
        let newQuizList = quizList
        let newQuiz = {
            uuid: uuidv4(),
            quiz_name: "New quiz name",
            questions: []
        }

        const createQuizUrl = "https://localhost:7006/PollCollections"
        setIsProcessing(true)

        fetch(createQuizUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "UserId": UserContext.getUserId(),
                "Name": newQuiz.quiz_name,
                "Polls": newQuiz.questions.map((question) => {
                    return {
                        "Name": question.question_text,
                        "Id": question.uuid,
                        "Options": question.answers.map((answer) => {
                            return {
                                "Name": answer.answer_text,
                                "pollId": question.uuid,
                                "Id": answer.uuid,
                                "isAnswer": false
                            }
                        })
                    }
                })
            })
        })
            .then(
                res => {
                    if (!res.ok) {
                        setIsProcessing(false)
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
                newQuiz.uuid = data
                setIsProcessing(false)

                setQuizList([newQuiz, ...newQuizList])
            })
    }

    const deleteQuiz = (quiz) => {
        let newQuizList = quizList
        let index = newQuizList.findIndex((el) => el.uuid === quiz.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }
        
        setIsProcessing(true)

        let deleteQuizUrl = `https://localhost:7006/PollCollections?Id=${quiz.uuid}`

        fetch(deleteQuizUrl, {
            method: "DELETE"
        })
            .then(res => {
                setIsProcessing(false)

                newQuizList.splice(index, 1)

                setQuizList([...newQuizList])
            }, res => {
                setIsProcessing(false)
                alert(res.text())
            })
    }

    const submitUpdate = (quiz) => {
        const updateQuizUrl = "https://localhost:7006/PollCollections"
        
        setIsProcessing(true)

        fetch(updateQuizUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                "Id": quiz.uuid,
                "UserId": UserContext.getUserId(),
                "Name": quiz.quiz_name,
                "Polls": quiz.questions.map((question) => {
                    return {
                        "Name": question.question_text,
                        "pollCollectionId": quiz.uuid,
                        "Id": question.uuid,
                        "Options": question.answers.map((answer) => {
                            return {
                                "Name": answer.answer_text,
                                "pollId": question.uuid,
                                "Id": answer.uuid,
                                "isAnswer": answer.correct
                            }
                        })
                    }
                })
            })
        })
            .then(
                res => res.json(),
                res => {
                    setIsProcessing(false)
                    alert(res.text())
                })
            .then(data => {
                setIsProcessing(false)
                console.log(data)
            })
    }

    return (
        <>
            <FetchSpinner status={isProcessing} />
            <WebNavbar message="Quiz List 🦉 Hooty"></WebNavbar>
            <Container style={{ maxWidth: "1000px" }}>
                <Card style={{ margin: "20px" }}>
                    <Card.Header >
                        <Button onClick={addQuiz} variant="outline-success"> + Add quiz</Button>
                    </Card.Header>

                    <Card.Body>
                        { renderQuizList() }
                    </Card.Body>
                    
                    <Card.Footer className="text-center text-muted">userID: {UserContext.getUserId()}</Card.Footer>
                </Card>
            </Container>
        </>
    )
}
