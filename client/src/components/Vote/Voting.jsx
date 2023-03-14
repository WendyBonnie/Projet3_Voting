
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

  async function getVoter() {
    let voter = await utils.getVoter(contract, accounts, setVoter)
    setVoter(voter)
  }
  useEffect(() => {
    getVoter()
  }, [])


  useEffect(() => { console.log("voter", voter) }, [voter])

  return (
    <Row>
      <Col>
        <h1>Get proposal</h1>
        <h1>voting</h1>
      </Col>
    </Row>
  );
}

export default Voting;
