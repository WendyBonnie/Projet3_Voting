import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function ColorSchemesExample() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Link>
            <Nav.Link href="#features">Admin</Nav.Link>
          </Link>
          <Link to={"/voting"}>
            <Nav.Link href="#pricing">Voter</Nav.Link>
          </Link>
          <Link to={"/tally-vote"}>
            <Nav.Link href="#pricing">Résultats</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
