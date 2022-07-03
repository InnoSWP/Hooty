import React from "react";
import { useNavigate } from "react-router";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Button from "react-bootstrap/Button"

import WebNavbar from "../WebNavbar";
import {DEBUG} from "../../context/utils";

export default function PlayCodePage() {

    const [code, setCode] = React.useState("")
    const navigate = useNavigate()

    const handleCodeChange = (event) => {
        setCode(event.target.value)
    }

    const getSessionId = () => {
        let url = (DEBUG ? `https://localhost:7006` : ``) + `/Sessions/${code}`

        fetch(url)
            .then(res => res.json(), res => alert(res))
            .then(data => {
                navigate(`/play/${data.id}`)
            })
    }

    return (
        <>
            <WebNavbar show={true} message="🦉 Welcome to Hooty!"></WebNavbar>
            <Container style={{ maxWidth: "1000px" }}>
                <Card className="text-center" style={{
                    margin: "20px"
                }}>
                    <Card.Header>Enter the code to enter</Card.Header>
                    <Card.Body>
                        <InputGroup className="mb-2">
                            <InputGroup.Text>Code: </InputGroup.Text>
                            <Form.Control
                                id="code-form"
                                type="text"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="12345678"
                                aria-label="12345678"
                            />
                        </InputGroup>

                        <div className="d-grid gap-2">
                            <Button
                                variant="outline-primary"
                                size="lg"
                                onClick={getSessionId}
                            >Enter</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}