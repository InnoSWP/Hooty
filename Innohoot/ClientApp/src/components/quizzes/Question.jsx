import React from "react";

import { v4 as uuidv4 } from 'uuid';

export default function Question(props) {
    
    const [question, setQuestion] = React.useState(props.params)
    
    const renderAnswers = () => {
        return question.answers.map((el, i) => (
            <div key={i} style={{border: "1px solid black"}}>
                <input type="checkbox" 
                       id={`${props.index}-${i}`} 
                       name={props.index} 
                       checked={el.correct} 
                       onChange={(event) => handleAnswerChange[0](event, el)} 
                       style={{
                           margin: "0 10px"
                }}/>
                <input type="text" 
                       value={el.answer_text} 
                       onChange={(event) => handleAnswerChange[1](event, el)} 
                       style={{
                           width: "80%"
                }}/>
                <button onClick={() => deleteAnswer(el)}>-</button>
            </div>
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
        
        setQuestion({...newQuestion})
    }
    
    const addAnswer = () => {
        let newQuestion = question
        newQuestion.answers.push({
            uuid: uuidv4(),
            answer_text: "",
            correct: false
        })
        setQuestion({...newQuestion})
    }
    
    const handleAnswerChange = [
        (event, answer) => {
            let newState = question
            let index = newState.answers.findIndex((el) => el.uuid === answer.uuid)

            if (index === -1) {
                console.log("no element found")
                return
            }
            
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
        setQuestion(newState)

        props.changeHandler(props.params, question)
    }
    
    return (
        <div style={{
            border: "1px solid black",
            padding: "5px",
            margin: "10px"
        }}>
            <div style={{
                marginBottom: "10px"
            }}>
                <button onClick={() => props.deleteHandler(props.params)}>- Question</button>
            </div>
            <div style={{
                marginBottom: "10px"
            }}>
                <input type="text" value={question.question_text} onChange={handleQuestionTextChange} style={{
                    padding: "10px",
                    width: "100%"
                }}/>
            </div>
            <div>
                {renderAnswers()}
            </div>
            <button onClick={addAnswer}>+ Answer</button>
        </div>
    )
}