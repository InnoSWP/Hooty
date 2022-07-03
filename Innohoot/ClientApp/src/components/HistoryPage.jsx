import React from "react";
import {DEBUG, UserContext} from "../context/utils";
import WebNavbar from "./WebNavbar";
import Card from "react-bootstrap/Card";
import {Accordion, ListGroup, Stack} from "react-bootstrap";
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
    
    const renderHistory = () => {
        
        
        return (
            <Accordion alwaysOpen>
                {
                    history.map(el => {

                        const dur = new Date(Date.UTC(0,0,0,0,0,0,el.duration))
                        const parts = [
                                dur.getUTCHours(),
                                dur.getUTCMinutes(),
                                dur.getUTCSeconds()
                            ]
                        const formattedDuration = parts.map(s => String(s).padStart(2,'0')).join(':');
                        
                        return (
                            <Accordion.Item eventKey={el.id}>
                                <Accordion.Header>
                                    {
                                        `${el.name} - ${el.starTime}`
                                    }
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Stack gap={2}>
                                        <div>
                                            <span className={"fs-4"}>Created: {new Date(el.created)}</span>
                                        </div>
                                        <div>
                                            <span className={"fs-4"}>Duration: {formattedDuration}</span>
                                        </div>
                                        
                                        <div>
                                            <span className={"fs-4"}>Participants: </span>
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