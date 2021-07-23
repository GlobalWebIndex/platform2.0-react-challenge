import React from "react";
import { Image, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
  <React.Fragment>
    <Row>
      <Col className="text-center">
        <Image src="https://seranking.com/blog/wp-content/uploads/2021/01/404_01-min.jpg"></Image>
      </Col>
    </Row>
    <Row>
      <Col className="text-center mt-1">
        <Link to="/">
          <Button variant="dark">Go home</Button>
        </Link>
      </Col>
    </Row>
  </React.Fragment>
);

export default NotFound;
