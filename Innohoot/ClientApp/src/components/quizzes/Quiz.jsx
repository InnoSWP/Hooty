import React from "react";
import Question from "./Question";

import { v4 as uuidv4 } from 'uuid';


export default function Quiz(props) {
    
    const [questions, setQuestions] = React.useState(props.params.questions)
    const [quizName, setQuizName] = React.useState(props.params.quiz_name)
    
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
        
    }
    
    
    return (
        <div style={{
            border: "1px solid black",
            padding: "5px",
            width: "500px",
            marginBottom: "20px"
        }}>
            <div>
                <button onClick={() => playQuiz(props.params.uuid)}>Play</button>
                <button onClick={() => props.submit({
                    quiz_name: quizName,
                    questions: questions,
                    uuid: props.params.uuid
                })}>Save</button>
                <button onClick={() => props.deleteHandler(props.params)}>- Quiz</button>
            </div>
            <div>
                <input type="text" value={quizName} onChange={handleQuizNameChange}/>
            </div>
            <div>
                {renderQuestionList()}
            </div>
            <div>
                <button onClick={addQuestion}>+ Question</button>
            </div>
        </div>
    )
}