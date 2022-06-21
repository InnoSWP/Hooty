import React from "react";
import { UserContext } from "../../context/UserContext";
import { LoginForm } from "./LoginForm";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import ListGroup from 'react-bootstrap/ListGroup'

import WebNavbar from '../WebNavbar';

import "../../css/App.css";

export function LoginPage(props) {
    return (
        <>
            <WebNavbar message="🦉 Welcome to Hooty!"></WebNavbar>
            <Container style={{ maxWidth: "1000px" }}>
                <Card className="text-center" style={{
                    margin: "20px"
                }}>
                    <Card.Header><br /></Card.Header>
                    <Card.Body>
                        <Card.Title>Sign in or Sign up to Hooty</Card.Title>
                        <Card.Text>
                            To sign in to your Hooty dashboard, please enter your username and password in the fields below.
                        </Card.Text>

                        <ListGroup className="d-flex justify-content-center" horizontal>
                            <ListGroup.Item>
                                <LoginForm label="Sign in" formName={"Login"} userContext={props.userContext} url={"https://localhost:7006/Users/login"} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <LoginForm label="Sign up" formName={"Create user"} userContext={props.userContext} url={"https://localhost:7006/Users"} />
                            </ListGroup.Item>
                        </ListGroup>

                    </Card.Body>
                    <Card.Footer className="text-muted">userID: {UserContext.getUserId()}</Card.Footer>
                </Card>
            </Container>
        </>
    );
}