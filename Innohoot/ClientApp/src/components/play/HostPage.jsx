import React from "react";
import PreQuiz from "./PreQuiz";
import HostQuestion from "./HostQuestion";

export default function HostPage(props) {
    
    const sessionId = document.location.pathname.replace("/host/", "")
    const pollCollectionId = document.location.hash.substr(1)
    
    const [quiz, setQuiz] = React.useState()
    const [currentPollIndex, setCurrentPollIndex] = React.useState(-1)
    
    React.useEffect(() => {
        let url = `https://localhost:7006/PollCollections?Id=${pollCollectionId}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setQuiz({...data})
            })
    }, [])
    
    
    const nextPoll = () => {
        let nextPollIndex = currentPollIndex + 1
        
        
        let nextPollId = quiz.polls[nextPollIndex].id
        let url = `https://localhost:7006/Polls/${nextPollId}/active`
        fetch(url, {method: "PUT"})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentPollIndex(nextPollIndex)
            })
    }
    
    return (
        <>
            {
                currentPollIndex === -1 ? 
                    <PreQuiz code={"abcde"} nextPoll={nextPoll} /> : 
                    <HostQuestion params={quiz.polls[currentPollIndex]} nextPoll={nextPoll} />
            }
        </>
    )
}