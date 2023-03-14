
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";
import React, { useEffect, useState } from "react";



function Voting() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [voter, setVoter] = useState();
  const [idProposal, setIdProposal] = useState();
  const [proposal, setProposal] = useState("");
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

  async function getVoter() {
    let voter = await utils.getVoter(contract, accounts, setVoter)
    setVoter(voter)
  }

  async function setVoting() {
    try {
      if (await contract.methods.setVote(idProposal).call({ from: accounts[0] })) {
        let vote = await contract.methods.setVote(idProposal).send({ from: accounts[0] })
        console.log(vote);
      }




    } catch (error) {
      console.log(error);
      alert(
        error.message.split(
          "VM Exception while processing transaction: revert"
        )[1]
      );
    }
  }

  async function getProposals() {

    try {

      let proposals = await contract.methods
        .getOneProposal(idProposal)
        .call({ from: accounts[0] })

      console.log(proposals);
      setProposal(proposals)


    } catch (error) {
      console.log(error);
      alert(
        error.message.split(
          "VM Exception while processing transaction: revert"
        )[1]
      );
    }

  }




  useEffect(() => {
    getVoter(),
      getStatus()
  }, [accounts, status])


  useEffect(() => { console.log("voter", voter) }, [voter])

  return (
    <Row>
      <Col>
        <input onChange={(e) => { setIdProposal(e.target.value) }} type="number" min={1} placeholder="Numéro de proposals"></input>
        <button onClick={getProposals}>Valider</button>
        <h1>Proposition sélectionné: {proposal.description} {proposal != "" && status == 3 && <button onClick={setVoting}>Voter</button>} </h1>


        <h1>voting</h1>
      </Col>
    </Row>
  );
}

export default Voting;
