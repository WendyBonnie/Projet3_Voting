import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Button(props) {
  let { name, action } = props;
  return (
    <Row>
      <Col>
        <button onClick={action}>{name}</button>
      </Col>
    </Row>
  );
}

export default Button;
