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

  const startProposalRegistering = async () => {};

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
        <Button name={"Start"} />
        <h2>End proposal registering</h2>
        <Button name={"Done"} />
        <h2>Start voting session</h2>
        <Button name={"Start"} />
        <h2>end voting session</h2>
        <Button name={"Done"} />
        <h2>Tally Vote</h2>
        <Button name={"Start"} />
      </Col>
    </Row>
  );
}

export default Admin;
