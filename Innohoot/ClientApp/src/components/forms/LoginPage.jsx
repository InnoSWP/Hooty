import React from "react";
import { UserContext } from "../../context/UserContext";
import { LoginForm } from "./LoginForm";

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

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
                    <Card.Header><br/></Card.Header>
                    <Card.Body>
                        <Card.Title>Sign in to Hooty</Card.Title>
                        <Card.Text>
                            To sign in to your Hooty dashboard, please enter your username and password in the fields below.
                        </Card.Text>

                        <div style={{ padding: "20px" }}>
                            <LoginForm formName={"Login"} userContext={props.userContext} />
                        </div>
                    </Card.Body>
                    <Card.Footer className="text-muted">userID: {UserContext.getUserId()}</Card.Footer>
                </Card>
            </Container>
        </>
    );
}