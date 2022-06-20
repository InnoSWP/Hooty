import React from "react";

export function PlayPage(props) {

    const sessionId = document.location.pathname.replace("/play/", "")
    
    const [poll, setPoll] = React.useState({
        id: 0,
        name: "",
        options: []
    })
    const [isAnswered, setIsAnswered] = React.useState()
    const [currentAnswer, setCurrentAnswer] = React.useState()
    const [participantName, setParticipantName] = React.useState(null)
    const [participantNameBuffer, setParticipantNameBuffer] = React.useState(null)
    
    const getPoll = () => {
        let url = `https://localhost:7006/polls/active?sessionId=${sessionId}`
        fetch(url)
            .then(
                res => res.json(), 
                res => {
                alert(res.text())
            })
            .then(data => {
                console.log(data)
                if (data.id !== poll.id) {
                    setIsAnswered(false)
                    setPoll({...data})
                }
                setTimeout(getPoll, 1000)
            })
        
        
    }
    
    const submitAnswer = () => {
        let url = `https://localhost:7006/Votes`
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                participantName: participantName,
                optionId: currentAnswer,
                id: poll.id,
                sessionId: sessionId
            })
        })
            .then(
                res => res.json(), 
                res => {
                alert(res.text())
            })
            .then(data => {
                console.log(data)
                setIsAnswered(true)
            })
    }
    
    const handleChange = (event) => {
        setCurrentAnswer(event.target.value)
    }
    
    const handleNameChange = [
        (event) => setParticipantNameBuffer(event.target.value),
        () => setParticipantName(participantNameBuffer)
    ]
    
    const renderOptions = () => {
        return (
            <>
                {
                    poll.options?.map((option) => {
                        return (
                            <div>
                                <label htmlFor={option.id}>
                                    <input type="radio"
                                           name={poll.id}
                                           id={option.id}
                                           value={option.id}
                                           onChange={handleChange}
                                    />
                                    {option.name}
                                </label>
                            </div>
                        )
                    })
                }
                <div>
                    <button onClick={submitAnswer}>Submit</button>
                </div>
            </>
            
        )
    }
    
    React.useEffect(() => {
        getPoll()
        setIsAnswered(false)
    }, [])
    
    const renderQuestion = () => {
        return (
            <div>
                <h2>{poll.name}</h2>
                <div>
                    {
                        isAnswered?
                            <h3>Waiting for next question...</h3> :
                            renderOptions()
                    }
                </div>
            </div>
        )
    }
    
    const renderNameForm = () => {
        return (
            <div>
                <label htmlFor="name-form">
                    Name: 
                    <input type="text" 
                           id="name-form"
                           value={participantName} 
                           onChange={handleNameChange[0]} 
                    />
                </label>
                <button onClick={handleNameChange[1]}>Save</button>
            </div>
        )
    }
    
    return (
        participantName === null? 
            renderNameForm() : 
            renderQuestion()
    )

}