import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";

function Home() {
  const {
    state: { contract, accounts },
  } = useEth();

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Bienvenue sur le vote du comité d'entreprise Lalaland</h1>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
