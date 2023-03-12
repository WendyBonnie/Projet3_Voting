import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function ColorSchemesExample(props) {
  const { owner, accounts, status } = props
  return (
    <Navbar bg="light" variant="light">
      <Container>

        <NavLink to={"/"}>
          <Navbar.Brand>Home</Navbar.Brand>
        </NavLink>

        <Nav className="me-auto">
          {accounts?.includes(owner) ? (<NavLink to={"/admin"}>
            <Nav.Link href="#features">Admin</Nav.Link>
          </NavLink>) : null}

          <NavLink to={"/voting"}>
            <Nav.Link href="#pricing">Voter</Nav.Link>
          </NavLink>
          <NavLink to={"/tally-vote"}>
            <Nav.Link href="#pricing">Résultats</Nav.Link>
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
