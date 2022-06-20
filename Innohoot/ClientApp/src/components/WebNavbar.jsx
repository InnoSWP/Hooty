import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function WebNavbar(props) {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand>{props.message}</Navbar.Brand>
            </Container>
        </Navbar>
    )
}
