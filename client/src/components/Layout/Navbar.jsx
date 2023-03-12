import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function ColorSchemesExample(props) {
  const { owner, accounts, status } = props
  return (
    <Navbar bg="light" variant="light">
      <Container>

        <Link to={"/"}>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          {accounts?.includes(owner) ? (<Link to={"/admin"}>
            <Nav.Link href="#features">Admin</Nav.Link>
          </Link>) : null}

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
