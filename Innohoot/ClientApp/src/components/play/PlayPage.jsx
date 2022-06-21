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
    const [participant, setParticipant] = React.useState({
        name: null,
        buffer: ""
    })
    const [code, setCode] = React.useState({
        value: null,
        buffer: ""
    })
    
    const getPoll = () => {
        let url = `https://localhost:7006/polls/active?sessionId=${sessionId}`
        fetch(url)
            .then(res => {
                    if (!res.ok) {
                        res.text()
                            .then(data => {
                                alert(data)
                                throw new Error(data)
                            })
                    } else {
                        return res.json()
                    }
                },
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
                participantName: participant.name,
                optionId: currentAnswer,
                id: poll.id,
                sessionId: sessionId
            })
        })
            .then(res => {
                    if (!res.ok) {
                        res.text()
                            .then(data => {
                                alert(data)
                                throw new Error(data)
                            })
                    } else {
                        return res.json()
                    }
                },
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
        (event) => setParticipant({
            name: participant.name,
            buffer: event.target.value
        }),
        () => setParticipant({
            name: participant.buffer,
            buffer: participant.buffer
        })
    ]
    
    const handleCodeChange = [
        (event) => setCode({
            value: code.value,
            buffer: event.target.value
        }),
        () => setCode({
            value: code.buffer,
            buffer: code.buffer
        })
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
                { poll.options?.length > 0 ?
                    <div>
                        <button onClick={submitAnswer}>Submit</button>
                    </div> : null
                }
            </>
            
        )
    }
    
    const renderQuestion = () => {
        return (
            <div>
                <h2>{poll.name}</h2>
                <div>
                    {
                        isAnswered ?
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
                           value={participant.buffer} 
                           onChange={handleNameChange[0]} 
                    />
                </label>
                <button onClick={handleNameChange[1]}>Save</button>
            </div>
        )
    }
    
    const renderCodeForm = () => {
        return (
            <div>
                <label htmlFor="code-form">
                    Code:
                    <input type="text"
                           id="code-form"
                           value={code.buffer}
                           onChange={handleCodeChange[0]}
                    />
                </label>
                <button onClick={handleCodeChange[1]}>Save</button>
            </div>
        )
    }
    
    return (
        code.value === null ? 
            renderCodeForm() :
            participant.name === null ? 
                renderNameForm() : 
                renderQuestion()
    )

}