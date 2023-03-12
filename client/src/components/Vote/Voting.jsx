import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";



function Voting() {
  const {
    state: { contract, accounts },
  } = useEth();




  useEffect(() => { console.log(contract) }, [])

  return (
    <Row>
      <Col>
        <h1>Start voting</h1>
        <h1>voting</h1>
        <h1>end voting</h1>
      </Col>
    </Row>
  );
}

export default Voting;
