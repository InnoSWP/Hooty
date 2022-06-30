import React from "react";
import { UserContext } from "../../context/utils";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

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
                        <Card.Title>Welcome to Hooty!</Card.Title>
                        <Card.Text>
                            To Log In to your Hooty dashboard or Sign Up to Hotty account, please enter your username and password in the fields below.
                        </Card.Text>

                        <ListGroup className="d-flex justify-content-center" horizontal>
                            <ListGroup.Item>
                                <LoginForm label="Log In" formName={"Login"} userContext={props.userContext} url={"https://localhost:7006/Users/login"} />
                            </ListGroup.Item>

                            <ListGroup.Item style={{ backgroundColor: "#f2f2f2" }} >
                                <RegisterForm label="Sign Up" formName={"Create user"} userContext={props.userContext} url={"https://localhost:7006/Users"} />
                            </ListGroup.Item>
                        </ListGroup>

                    </Card.Body>
                    <Card.Footer className="text-muted">userID: {UserContext.getUserId()}</Card.Footer>
                </Card>
            </Container>
        </>
    );
}