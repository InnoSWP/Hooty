import React from "react";
import Quiz from "./quizzes/Quiz";

import { v4 as uuidv4 } from 'uuid';
import {UserContext} from "../context/UserContext";


export default function QuizListPage(props) {
    
    const [quizList, setQuizList] = React.useState([])
    const userContext = React.useContext(UserContext)
    
    React.useEffect(() => {
        let url = `/Users/pollCollection?Id=${userContext.userId}`
        
        fetch(url)
            .then(res => res.json())
            .then((data) => {
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
            })
    }, [])
    
    const renderQuizList = () => {
        return quizList.map(
            (quiz) => <Quiz params={quiz} changeHandler={handleChange} key={quiz.uuid} deleteHandler={deleteQuiz} submit={submit} />
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
        newQuizList.push({
            uuid: uuidv4(),
            quiz_name: "new quiz",
            questions: []
        })
        
        setQuizList([...newQuizList])
    }
    
    const deleteQuiz = (quiz) => {
        let newQuizList = quizList
        let index = newQuizList.findIndex((el) => el.uuid === quiz.uuid)

        if (index === -1) {
            console.log("no element found")
            return
        }
        
        newQuizList.splice(index, 1)
        
        setQuizList([...newQuizList])
    }
    
    const submit = () => {
        console.log(quizList)
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