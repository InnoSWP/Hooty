import React from "react";
import {DEBUG, UserContext} from "../context/utils";
import WebNavbar from "./WebNavbar";
import Card from "react-bootstrap/Card";
import {Accordion, Button, ListGroup, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function HistoryPage(props) {
    
    const [history, setHistory] = React.useState([])
    
    React.useEffect(() => {
        const url = (DEBUG ? `https://localhost:7006` : ``) + `/Users/${UserContext.getUserId()}/Sessions`
        
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(res.text())
                }
            })
            .then(data => {
                setHistory([...data])
            })
            .catch(res => {
                alert(res)
            })
    }, [])

    const exportResults = (sessionId) => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/votes/excel?sessionId=${sessionId}`
        fetch(url)
            .then(res => {
                console.log(res)
                return res.blob()
            })
            .then(data => {
                let file = window.URL.createObjectURL(data);
                window.open(file);
            })
    }
    
    const renderHistory = () => {
        
        
        return (
            <Accordion alwaysOpen>
                {
                    history.map(el => {

                        const date = new Date(el.created)
                        const start = new Date(el.starTime)
                        
                        return (
                            <Accordion.Item eventKey={el.id}>
                                <Accordion.Header>
                                    <Stack direction={"horizontal"} gap={3}>
                                        <div className={"mr-3"}>
                                            {
                                                `${el.name} - ${start.toLocaleDateString()} ${start.toLocaleTimeString()}`
                                            }
                                        </div>
                                        <div className={"ms-auto"}>
                                            <Button
                                                onClick={() => exportResults(el.id)}
                                                variant={"success"}>
                                                Export results
                                            </Button>
                                        </div>
                                    </Stack>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Stack gap={2}>
                                        <div>
                                            <span className={"fs-5"}>Created: {date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
                                        </div>
                                        <div>
                                            <span className={"fs-5"}>Duration: {el.duration.split('.')[0]}</span>
                                        </div>
                                        
                                        <div>
                                            <span className={"fs-5"}>Participants: </span>
                                            <ListGroup>
                                                {
                                                    el.participantList.map(par => {
                                                        return (
                                                            <ListGroup.Item>
                                                                {par}
                                                            </ListGroup.Item>
                                                        )
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </Stack>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })
                }
            </Accordion>
        )
    }
    
    return (
        <>
            <WebNavbar show={true} message="Host Page 🦉 Hooty" />
            <Container style={{ maxWidth: "1000px" }}>
                <Card style={{ margin: "20px" }}>
                    <Card.Header>
                    </Card.Header>

                    <Card.Body className="text-center">
                        {renderHistory()}
                    </Card.Body>
                        
                    <Card.Footer className="text-center text-muted" />
                </Card>
            </Container>
        </>
    )
}