import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import { UserContext } from '../context/utils';

export default function WebNavbar(props) {
    let navigate = useNavigate()
    let aboba = () => {
        UserContext.removeUserId()
        navigate("/login")
    }

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>{props.message}</Navbar.Brand>

                {props.show ?
                    <>
                        <Button 
                            onClick={() => {navigate("/history")}} 
                            variant=''>History</Button>
                        <Button
                            onClick={() => { navigate("/quizlist") }}
                            variant=''>Quiz Page</Button>
                        <Button
                            onClick={aboba}
                            variant=''>Sign out</Button></>
                    : <></>
                }
            </Container>
        </Navbar>
    )
}
