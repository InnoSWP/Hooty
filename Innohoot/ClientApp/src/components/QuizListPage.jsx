import React from "react";
import Quiz from "./quizzes/Quiz";

import { v4 as uuidv4 } from 'uuid';
import {UserContext} from "../context/UserContext";


export default function QuizListPage(props) {
    
    const [quizList, setQuizList] = React.useState([])
    const userContext = React.useContext(UserContext)
    console.log(userContext)
    
    const user = "5f7d9001-2689-4d95-9c03-f7ea475df90b"
    
    React.useEffect(() => {
        let url = `https://localhost:7006/Users/PollCollections?Id=${UserContext.getUserId()}`
        
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
                                        correct: true
                                    }
                                })
                            }
                        })
                    }
                })
                
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
            quiz_name: "new quiz",
            questions: []
        }
        
        
        const createQuizUrl = "https://localhost:7006/PollCollections"
        
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
                                "Id": answer.uuid
                            }
                        })
                    }
                })
            })
        })
            .then(
                res => res.json(),
                res => {
                    alert(res.text())
                })
            .then(data => {
                console.log(data)
                newQuiz.uuid = data
                newQuizList.push(newQuiz)
                setQuizList([...newQuizList])
            })
        
        
    }
    
    const deleteQuiz = (quiz) => {
        let newQuizList = quizList
        let index = newQuizList.findIndex((el) => el.uuid === quiz.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }
        
        let deleteQuizUrl = `https://localhost:7006/PollCollections?Id=${quiz.uuid}`
        
        fetch(deleteQuizUrl, {
            method: "DELETE"
        })
            .then(res => {

                newQuizList.splice(index, 1)

                setQuizList([...newQuizList])
            }, res => {
                alert(res.text())
            })
        
        
    }
    
    const submitUpdate = (quiz) => {

        const updateQuizUrl = "https://localhost:7006/PollCollections"

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
                                "Id": answer.uuid
                            }
                        })
                    }
                })
            })
        })
            .then(
                res => res.json(),
                res => {
                    alert(res.text())
                })
            .then(data => {
                console.log(data)
            })
    }
    
    return (
        <div style={{
            margin: "20px"
        }}>
            <p>Your id: {UserContext.getUserId()}</p>
            <div>
                {renderQuizList()}
            </div>
            <div>
                <button onClick={addQuiz}>+ Quiz</button>
            </div>
        </div>
    )
}