import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";
import React, { useEffect, useState } from "react";
import Button from "../Layout/Button";

function Voting() {
  const {
    state: { contract, accounts, txhash, web3 },
  } = useEth();
  const [voter, setVoter] = useState();
  const [idProposal, setIdProposal] = useState();
  const [proposal, setProposal] = useState("");
  const [status, setStatus] = useState(0);
  const [eventData, setEventData] = useState(null);
  const [allProposal, setAllProposal] = useState([])
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
    let voter = await utils.getVoter(contract, accounts, setVoter);
    setVoter(voter);
  }

  async function setVoting(id) {
    try {
      if (
        await contract.methods.setVote(id).call({ from: accounts[0] })
      ) {
        let vote = await contract.methods
          .setVote(id)
          .send({ from: accounts[0] });
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
    return eventData?.map(async (element) => {
      let proposals = await contract.methods
        .getOneProposal(element.proposalId)
        .call({ from: accounts[0] });

      allProposal.push(proposals)
    })
  }

  function renderProposal() {
    return allProposal.map((el, index) => {

      return (<div key={index}> <Col md={12} className="workflowBox">

        <h1>{el.description} </h1>
      </Col> <Button name={"Voter"} action={() => setVoting(eventData[index].proposalId)} /></div>)
    })
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
        setEventData(Transfers);
      }
    }
    getPastEvent();
  }, [contract]);


  useEffect(() => {
    getVoter();
    getStatus();
    getProposals()
  }, [accounts, status]);





  useEffect(() => {

  }, [contract]);

  useEffect(() => {
    console.log("event", eventData);
  }, [eventData]);

  return (
    <Row className="homeContainer">
      <Col className="display">
        <Row className="divPropal">
          <Col>
            <h1>Veuillez choisir le numéro de proposition</h1>

          </Col>
        </Row>
        <Row>
          {renderProposal()}
        </Row>
        <Row>
          {/* <Col md={12} className="workflowBox">
            <h1>Proposition sélectionnée: </h1>
            <h1>{proposal.description} </h1>
          </Col> */}
          <Col md={12}>


            {proposal != "" && status == 3 && (
              <Button name={"Voter"} action={setVoting} />
            )}
          </Col>
        </Row>


      </Col>


    </Row>
  );
}

export default Voting;
