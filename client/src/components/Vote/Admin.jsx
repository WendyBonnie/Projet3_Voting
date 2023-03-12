import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from '../Layout/Button';
import Form from 'react-bootstrap/Form';

function Admin() {
  return (
    <Row>
      <Col>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adresse du voteur</Form.Label>
        <Form.Control type="text" placeholder="Public Key" />
        <Form.Text className="text-muted">
          Pas de clef privé
        </Form.Text>
      </Form.Group>
      </Form>
        <h1>Get Proposal</h1>
        <h1>Add Proposal</h1>
        <h1>End proposal registering</h1>
      </Col>
    </Row>
  );
}

export default Admin;
