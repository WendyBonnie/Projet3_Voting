import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useEth from "../../contexts/EthContext/useEth";

function RegisterVote() {

  const {
    state: { contract, accounts },
  } = useEth();
  async function addVoter (address) {
    try {
        if(await contract.methods.addVoter(accounts[0]).call({ from: accounts[0] })) {
            await contract.methods.addVoter(accounts[0]).send({ from: accounts[0] });
            alert("Le voteur a bien été enregistré")
        }
        
    } catch (error) {
        alert(error.message.split("VM Exception while processing transaction: revert")[1]);

    }

    
   
  }

  return (
    <Row>
      <Col>
        <h1>Get voter</h1>
        <h1>Subscribe to the vote</h1>
      </Col>
    </Row>
  );
}

export default RegisterVote;
