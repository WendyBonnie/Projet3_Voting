import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";
import React, { useEffect, useState } from "react";

function TallyVote() {
  const {
    state: { contract, accounts },
  } = useEth();

  const [winner, setWinner] = useState(0);

  async function getWinnerProposals() {
    try {
      let winner = await contract.methods
        .winningProposalID()
        .call({ from: accounts[0] });

      console.log("winning", winner);
      let proposals = await contract.methods
        .getOneProposal(winner)
        .call({ from: accounts[0] });

      console.log("props", proposals);
      setWinner(proposals);
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
    getWinnerProposals();
  }, []);

  return (
    <Row className="homeContainer">
      <Col>
        <Row className="justify">
          <Col md={5} className="workflowBox">
            <h1>
              VOICI LE GAGNANT : {winner.description} avec {winner.voteCount}{" "}
              voix !
            </h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default TallyVote;
