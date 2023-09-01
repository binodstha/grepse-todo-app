import { Container, Row, Col } from "react-bootstrap";
import "./dashboard.styles.scss";
import { PageLoader } from "shared/component/PageLoader";


export const Dashboard = () => {
  return (
    <Container className="m-5 p-2 rounded mx-auto bg-light shadow">
      <Row className="mx-1 px-5 pb-3 w-80 dashboard-item">
        <Col className="h3 d-flex justify-content-center text-primary title">
          Welcome to &nbsp;<span className="fw-bold">Grepsr Task Management App</span>!
        </Col>
        <Col className="p text">
          Hello and welcome aboard to our powerful <strong>Grepsr Task Management App</strong>! We're excited to
          have you join us on this journey towards better organization and
          increased productivity.
        </Col>
        <Col className="p text">
          With our app, you'll be able to streamline your tasks, set priorities,
          and stay on top of your commitments like never before. No more
          forgotten appointments, missed deadlines, or scattered notes. We're
          here to help you take control of your day and make the most out of
          your time
        </Col>
        <PageLoader/>
      </Row>
    </Container>
  );
};
