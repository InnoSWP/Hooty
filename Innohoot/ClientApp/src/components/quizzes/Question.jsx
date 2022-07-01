import React from "react";

import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import IconBin from '../Icons';

import { v4 as uuidv4 } from 'uuid';

export default function Question(props) {

    const [question, setQuestion] = React.useState(props.params)

    const renderAnswers = () => {
        return question.answers.map((el) => (
            <InputGroup key={el.uuid} className="mb-2">
                <InputGroup.Checkbox
                    id={el.uuid}
                    name={props.index}
                    checked={el.correct}
                    onChange={(event) => handleAnswerChange[0](event, el)}
                />

                <Form.Control
                    type="text"
                    value={el.answer_text}
                    onChange={(event) => handleAnswerChange[1](event, el)}
                    placeholder="Answer text..." />

                <Button
                    onClick={() => deleteAnswer(el)}
                    variant="outline-danger">
                    <IconBin />
                </Button>
            </InputGroup>
        ))
    }

    const deleteAnswer = (answer) => {
        let newQuestion = question
        let index = newQuestion.answers.findIndex((el) => el.uuid === answer.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }

        newQuestion.answers.splice(index, 1)

        setQuestion({ ...newQuestion })
    }

    const addAnswer = () => {
        let newQuestion = question
        newQuestion.answers.push({
            uuid: uuidv4(),
            answer_text: "",
            correct: false
        })
        setQuestion({ ...newQuestion })
    }

    const clearChoices = () => {
        question.answers.map((el) => {
            el.correct = false
        })
    }

    const handleAnswerChange = [
        (event, answer) => {
            let newState = question
            let index = newState.answers.findIndex((el) => el.uuid === answer.uuid)

            if (index === -1) {
                console.log("no element found")
                return
            }

            // Radio
            question.answers.map((el) => {
                el.correct = false
            })

            question.answers[index].correct = event.target.checked
            setQuestion(newState)

            props.changeHandler(props.params, question)
        },
        (event, answer) => {
            let newState = question
            let index = newState.answers.findIndex((el) => el.uuid === answer.uuid)

            if (index === -1) {
                console.log("no element found")
                return
            }

            newState.answers[index].answer_text = event.target.value
            setQuestion(newState)

            props.changeHandler(props.params, question)
        }
    ]

    const handleQuestionTextChange = (event) => {
        let newState = question
        newState.question_text = event.target.value
        setQuestion({ ...newState })

        props.changeHandler(newState)
    }

    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Text>
                    <InputGroup className="mb-2">
                        <Button
                            onClick={addAnswer}
                            variant="outline-secondary">Add an answer</Button>

                        <Form.Control
                            type="text"
                            value={question.question_text}
                            onChange={handleQuestionTextChange}
                            as="textarea"
                            placeholder="Question text..." />

                        <Button
                            onClick={() => props.deleteHandler(props.params)}
                            variant="outline-danger">
                            <IconBin />
                        </Button>
                    </InputGroup>

                    {renderAnswers()}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
        </Card>
    )
}