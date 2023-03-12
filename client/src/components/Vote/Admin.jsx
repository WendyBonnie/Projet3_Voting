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
      let status = await contract.methods
        .addVoter("0x22456dd8353c44425A9aB44D8A7b3C997d83D48F")
        .send({ from: accounts[0] });
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row>
      <Col>
        <Form>
          <input
            onChange={(e) => setKey(e.target.value)}
            placeholder="ajoutez une adresse"
          />
        </Form>
        <button onClick={addVoter}>Valider</button>
        <h1>Get Proposal</h1>
        <h1>Add Proposal</h1>
        <h1>End proposal registering</h1>
      </Col>
    </Row>
  );
}

export default Admin;
