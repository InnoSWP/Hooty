import React from "react";
import Button from 'react-bootstrap/Button';

export default function SubmitButton(props) {
    return (
        <Button
            variant="outline-primary"
            type="submit"
            className={"submit-button"}>
            Sign in
        </Button>
    )
}