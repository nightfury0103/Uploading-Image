import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import { TaskView, TaskUploadForm } from "./components/Task";

import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col xs={12} md={4}>
          <TaskUploadForm />
        </Col>
        <Col xs={12} md={8}>
          <TaskView />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
