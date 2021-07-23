import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";

const Loading: React.FC = () => {
  return (
    <div>
      <Row>
        <Col className="text-center" md={{ span: 2, offset: 5 }}>
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    </div>
  );
};

export default Loading;
