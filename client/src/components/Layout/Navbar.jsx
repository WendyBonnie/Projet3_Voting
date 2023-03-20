import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function ColorSchemesExample(props) {
  const { owner, accounts, status } = props;

  console.log("sTAT", status);
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <NavLink className="nav-link" to={"/"}>
          <h1>Home</h1>
        </NavLink>

        <Nav className="me-auto">
          {accounts?.includes(owner) ? (
            <NavLink to={"/admin"}>
              <h1 className="nav-link">Admin</h1>
            </NavLink>
          ) : null}
          {status !== 3 ? null : (
            <NavLink to={"/voting"}>
              <h1 className="nav-link">Voter</h1>
            </NavLink>
          )}

          {status == 5 && (
            <NavLink to={"/tallyVote"}>
              <h1 className="nav-link">Résultats</h1>
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ColorSchemesExample;
