import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";

function Home() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [status, setStatus] = useState(0);
  const [WorkflowStatus, setWorkflowStatus] = useState([
    "RegisteringVoters",
    "ProposalsRegistrationStarted",
    "ProposalsRegistrationEnded",
    "VotingSessionStarted",
    "VotingSessionEnded",
    "VotesTallied",
  ]);

  function getStatus() {
    utils.getStatus(contract, accounts).then((result, err) => {
      if (err) {
        console.log(err);
      } else {
        setStatus(result);
      }
    });
  }

  useEffect(() => {
    getStatus();
    console.log("status home", status);
  }, [accounts]);

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Bienvenue sur le vote du comité d'entreprise Lalaland</h1>
          </Col>
        </Row>
        <Row>
          <Col> statut de la session de vote</Col>
        </Row>
        <Row>
          <Col>{WorkflowStatus[status]}</Col>
        </Row>
        <Row>
          {status == 1 ? (
            <Col>
              <h2>Veuillez rentrer une proposition</h2>
              <input />
            </Col>
          ) : (
            <Col>Les propositions ne sont pas encore ouvertes</Col>
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
