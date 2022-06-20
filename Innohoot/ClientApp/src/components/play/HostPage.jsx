import React from "react";
import PreQuiz from "./PreQuiz";
import HostQuestion from "./HostQuestion";
import {useNavigate} from "react-router";

export default function HostPage(props) {
    
    const sessionId = document.location.pathname.replace("/host/", "")
    const pollCollectionId = document.location.hash.substr(1)
    
    const navigate = useNavigate()
    
    const [quiz, setQuiz] = React.useState()
    const [currentPollIndex, setCurrentPollIndex] = React.useState(-1)
    
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
            let url = `https://localhost:7006/Sessions/${sessionId}/close`
            fetch(url, {method: "PUT"})
                .then(res => {
                    console.log(res.json())
                    navigate("/quizlist")
                }, res => {
                    alert(res.text())
                })
            
            return
        }

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
    
    return (
        <>
            {
                currentPollIndex === -1 ? 
                    <PreQuiz code={"abcde"} nextPoll={nextPoll} debugUrl={`https://localhost:44402/play/${sessionId}`}/> : 
                    <HostQuestion params={quiz.polls[currentPollIndex]} nextPoll={nextPoll} sessionId={sessionId} />
            }
        </>
    )
}