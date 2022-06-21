﻿import React from "react";
import Question from "./Question";

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

export default function Quiz(props) {

    const [questions, setQuestions] = React.useState(props.params.questions)
    const [quizName, setQuizName] = React.useState(props.params.quiz_name)

    const navigate = useNavigate()

    const renderQuestionList = () => {
        return questions.map((question) => <Question params={question} changeHandler={handleChange} key={question.uuid} deleteHandler={deleteQuestion} />)
    }

    const addQuestion = () => {
        let newQuestions = questions
        newQuestions.push({
            uuid: uuidv4(),
            question_text: "",
            answers: []
        })
        setQuestions([...newQuestions])
    }

    const deleteQuestion = (question) => {
        let newQuestions = questions
        let index = newQuestions.findIndex((el) => el.uuid === question.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }

        newQuestions.splice(index, 1)

        setQuestions([...newQuestions])
    }

    const handleChange = (question) => {
        let newQuestions = questions
        let index = newQuestions.findIndex((el) => el.uuid === question.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }

        newQuestions[index] = question

        setQuestions([...newQuestions])

        props.changeHandler({
            uuid: props.params.uuid,
            quiz_name: quizName,
            questions: questions
        })
    }

    const handleQuizNameChange = (event) => {
        setQuizName(event.target.value)

        props.changeHandler({
            uuid: props.params.uuid,
            quiz_name: quizName,
            questions: questions
        })
    }

    const playQuiz = (id) => {
        
        let code = generateCode()
        let url = `https://localhost:7006/Sessions/start?pollCollectionId=${props.params.uuid}&accessCode=${code}`
        
        fetch(url)
            .then(
                res => res.json(), 
                res => {
                    alert(res.text())
                })
            .then(data => {
                console.log(data)
                navigate(`/host/${data}?id=${props.params.uuid}&code=${code}`)
            })
    }

    const generateCode = () => {
        let code = ""
        let len = 8

        const arr = new Uint8Array(8)
        crypto.getRandomValues(arr)

        for (let arrElement of arr) {
            code += (arrElement % 10).toString()
        }
        
        return code
    }

    return (
        <>
            <Card className="mb-2" style={{ padding: "15px" }}>
                <InputGroup className="mb-2">
                    <InputGroup.Text></InputGroup.Text>
                    <Form.Control
                        placeholder="New quiz name"
                        aria-label="New quiz name"
                        value={quizName}
                        onChange={handleQuizNameChange}
                        type="text"
                    />

                    <Button
                        onClick={() => playQuiz(props.params.uuid)}
                        variant="outline-success">Play</Button>

                    <Button
                        onClick={() => props.submit({
                            quiz_name: quizName,
                            questions: questions,
                            uuid: props.params.uuid
                        })}
                        variant="outline-secondary">Save</Button>

                    <Button
                        onClick={() => props.deleteHandler(props.params)}
                        variant="outline-danger">Delete</Button>
                </InputGroup>
                
                <div>
                    {renderQuestionList()}
                </div>

                <Button
                    className="mt-2"
                    onClick={addQuestion}
                    variant="outline-primary">Add a question...</Button>
            </Card>
        </>
    )
}
