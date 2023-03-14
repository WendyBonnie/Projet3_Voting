import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Button1(props) {
  let { name, action } = props;
  return (
    <Row>
      <Col>
        <button className="my-button" onClick={action}>
          {name}
        </button>
      </Col>
    </Row>
  );
}

export default Button1;
