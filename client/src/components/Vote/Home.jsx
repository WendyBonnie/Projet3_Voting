import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";
import Button from "../Layout/Button";
import "../Vote/Style.css";

function Home() {
  const { state: { contract, accounts, txhash, web3 } } = useEth();
  const [status, setStatus] = useState(0);
  const [proposition, setProposition] = useState("");
  const [voter, setVoter] = useState({});

  // PARTIE EVENT

  const [newEvents, setNewEvents] = useState([]);

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

  async function getVoter() {
    let voter = await utils.getVoter(contract, accounts, setVoter);
    setVoter(voter);
  }

  async function renderProposals() {
    newEvents.map()
  }

  useEffect(() => {
    async function getPastEvent() {
      if (contract) {
        // const deployTx = await web3.eth.getTransaction(txhash)
        // console.log("dTX", deployTx);
        const results = await contract.getPastEvents("ProposalRegistered", { fromBlock: 0, toBlock: "latest" });
        console.log(results);
        const Transfers = results.map((transfer) => {
          let PastE = { proposalId: null, };
          PastE.proposalId = transfer.returnValues.proposalId;

          return PastE;
        });
        setNewEvents(Transfers);
      }
    }
    getPastEvent();
  }, [contract]);


  useEffect(() => {
    getVoter();
    getStatus();
    console.log("newEvents", newEvents);

  }, [accounts, status, newEvents]);

  useEffect(() => {
    console.log("voter", voter?.isRegistered);
  }, [voter]);

  return (
    <Row className="homeContainer">
      <Col className="display">
        <Row>
          <Col>
            <h1>Bienvenue sur le vote du comité d'entreprise Lalaland</h1>
          </Col>
        </Row>
        <Row className="workflowBox">
          <Col md={12}>
            <h3>statut de la session de vote</h3>
          </Col>

          <Col md={12}>
            <h3>{WorkflowStatus[status]}</h3>
          </Col>
        </Row>
        <Row>
          {status != 1 && voter?.isRegistered ? (
            <Col>
              <h3>Les propositions ne sont pas encore ouvertes</h3>
            </Col>
          ) : status != 1 && !voter?.isRegistered ? (
            <Col>
              <p>Vous n'êtes pas enregistré</p>
            </Col>
          ) : (
            status == 1 &&
            voter?.isRegistered && (
              <Col>
                <h2>Veuillez rentrer une proposition</h2>
                <input
                  className="my-input"
                  onChange={(e) => setProposition(e.target.value)}
                />
                <Button name={"Ajouter ma proposition"} action={addProposal} />
              </Col>
            )
          )}
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
