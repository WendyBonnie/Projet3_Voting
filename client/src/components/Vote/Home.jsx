import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";
import Button from "../Layout/Button";

function Home() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [status, setStatus] = useState(0);
  const [proposition, setProposition] = useState("");

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

  const addProposal = async () => {
    try {
      if (
        await contract.methods
          .addProposal(proposition)
          .call({ from: accounts[0] })
      ) {
        let proposal = await contract.methods
          .addProposal(proposition)
          .send({ from: accounts[0] });
        console.log(proposal);
        setProposition("");
      }
    } catch (error) {
      console.log(error);
      alert(
        error.message.split(
          "VM Exception while processing transaction: revert"
        )[1]
      );
    }
  };

  useEffect(() => {
    getStatus();
    console.log("status home", status);
  }, [accounts, status]);

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
              <input onChange={(e) => setProposition(e.target.value)} />
              <Button name={"Ajouter ma proposition"} action={addProposal} />
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
