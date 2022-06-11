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
        let url = `https://localhost:7006/Users/PollCollections?Id=${user}`
        
        fetch(url)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                let mappedQuizList = data.PollsCollections.map((pollCollectionDTO) => {
                    return {
                        uuid: pollCollectionDTO.Id,
                        quiz_name: pollCollectionDTO.Name,
                        questions: pollCollectionDTO.Polls.map((pollDTO) => {
                            return {
                                uuid: pollDTO.Id,
                                quiz_name: pollDTO.Name,
                                questions: pollDTO.map((poll) => {
                                    return {
                                        uuid: poll.Id,
                                        question_text: poll.Name,
                                        answers: poll.Options.map((option) => {
                                            return {
                                                uuid: option.Id,
                                                answer_text: option.Name,
                                                correct: true
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                
                setQuizList(mappedQuizList)
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
                "UserId": user,
                "Name": newQuiz.quiz_name,
                "Polls": newQuiz.questions.map((question) => {
                    return {
                        "Name": question.question_text,
                        "Options": question.answers.map((answer) => {
                            return {
                                "Name": answer.answer_text
                            }
                        })
                    }
                })
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        
        fetch(deleteQuizUrl)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                newQuizList.splice(index, 1)

                setQuizList([...newQuizList])
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
                "UserId": user,
                "Name": quiz.quiz_name,
                "Polls": quiz.questions.map((question) => {
                    return {
                        "Name": question.question_text,
                        "Options": question.answers.map((answer) => {
                            return {
                                "Name": answer.answer_text
                            }
                        })
                    }
                })
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    
    return (
        <div style={{
            margin: "20px"
        }}>
            <div>
                {renderQuizList()}
            </div>
            <div>
                <button onClick={addQuiz}>+ Quiz</button>
            </div>
        </div>
    )
}