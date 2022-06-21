import React from "react";
import Question from "./Question";

import { v4 as uuidv4 } from 'uuid';
import {UserContext} from "../../context/UserContext";
import {useNavigate} from "react-router";


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
        let url = `https://localhost:7006/Sessions/start?pollCollectionId=${props.params.uuid}&userId=${UserContext.getUserId()}`
        
        let code = generateCode()
        
        fetch(url)
            .then(
                res => res.json(), 
                res => {
                    alert(res.text())
                })
            .then(data => {
                console.log(data)
                navigate(`/host/${data}#${props.params.uuid}`)
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
        <div style={{
            border: "1px solid black",
            padding: "5px",
            width: "500px",
            marginBottom: "20px"
        }}>
            <div>
                <button onClick={() => playQuiz(props.params.uuid)} disabled={props.params.questions.length === 0 }>Play</button>
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