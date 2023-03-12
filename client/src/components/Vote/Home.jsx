import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";
import utils from "../utils/utils";

function Home() {
  const {
    state: { contract, accounts },
  } = useEth();

  


  async function startProposal() {
    try {
      if (
        await contract.methods
          .startProposalsRegistering()
          .call({ from: accounts[0] })
      ) {
        // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        let status = await contract.methods
          .startProposalsRegistering()
          .call({ from: accounts[0] });
        console.log(status);
      }
    } catch (error) {
      console.log(error);
      console.log(
        error.message.split(
          "VM Exception while processing transaction: revert"
        )[1]
      );
    }
  }

  async function startProposal() {
    try {
      if (
        await contract.methods
          .startProposalsRegistering()
          .call({ from: accounts[0] })
      ) {
        // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        let status = await contract.methods
          .startProposalsRegistering()
          .send({ from: accounts[0] });
        console.log(status);
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

 



  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Bienvenue sur le vote du comité d'entreprise Lalaland</h1>
            <button onClick={startProposal}>
              Lancer la session enregistrement de proposition
            </button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
