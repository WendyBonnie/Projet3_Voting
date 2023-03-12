import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../Layout/Button";
import Form from "react-bootstrap/Form";
import useEth from "../../contexts/EthContext/useEth";

function Admin() {
  const {
    state: { contract, accounts },
  } = useEth();
  const [key, setKey] = useState("");

  const addVoter = async () => {
    console.log("key", key);
    try {
      if (await contract.methods.addVoter(key).call({ from: accounts[0] })) {
        // let start = await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
        let status = await contract.methods
          .addVoter(key)
          .send({ from: accounts[0] });
        console.log(status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const startProposalRegistering = async () => {
    try {
      if (
        await contract.methods
          .startProposalsRegistering()
          .call({ from: accounts[0] })
      ) {
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
  };

  const endProposalRegistering = async () => {
    try {
      if (
        await contract.methods
          .endProposalsRegistering()
          .call({ from: accounts[0] })
      ) {
        let status = await contract.methods
          .endProposalsRegistering()
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
  };

  const startVotingSession = async () => {
    try {
      if (
        await contract.methods.startVotingSession().call({ from: accounts[0] })
      ) {
        let status = await contract.methods
          .startVotingSession()
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
  };

  const endVotingSession = async () => {
    try {
      if (
        await contract.methods.endVotingSession().call({ from: accounts[0] })
      ) {
        let status = await contract.methods
          .endVotingSession()
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
  };

  const tallyVote = async () => {
    try {
      if (await contract.methods.tallyVotes().call({ from: accounts[0] })) {
        let status = await contract.methods
          .tallyVotes()
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
  };

  return (
    <Row>
      <Col>
        <h2>Veuillez rajouter des voteurs</h2>
        <Form>
          <input
            onChange={(e) => setKey(e.target.value)}
            placeholder="ajoutez une adresse"
          />
        </Form>
        <button onClick={addVoter}>Valider</button>

        <h2>Start proposal registering</h2>
        <Button name={"Start"} action={startProposalRegistering} />
        <h2>End proposal registering</h2>
        <Button name={"Done"} action={endProposalRegistering} />
        <h2>Start voting session</h2>
        <Button name={"Start"} action={startVotingSession} />
        <h2>end voting session</h2>
        <Button name={"Done"} action={endVotingSession} />
        <h2>Tally Vote</h2>
        <Button name={"Start"} action={tallyVote} />
      </Col>
    </Row>
  );
}

export default Admin;
