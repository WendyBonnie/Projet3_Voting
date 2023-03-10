import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';

function Button(props) {
  let { name, action } = props;
  return (
    <Row>
      <Col>
        <Button onClick={action}>{name}</Button>
      </Col>
    </Row>
  );
}

export default Button;
