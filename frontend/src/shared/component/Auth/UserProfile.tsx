import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { PageLoader } from "../PageLoader";
import './user-profile.scss'

export const UserProfile: React.FC = ({}) => {
  const { user , isAuthenticated, isLoading, } = useAuth0();
  if (isLoading) {
    return <PageLoader/>;
  }

  if (!isAuthenticated || !user) {
    return <div>User not authenticated.</div>;
  }

  return (
    isAuthenticated && (
    <Container>
      <div className="main-body">
        <Row className="gutters-sm">
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-center text-center">
                  <img src={user.picture} alt={user.name} className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">{user.nickname}</p>
                    <p className="text-muted font-size-sm">{user.email}</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-3">
              <Card.Body>
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Nickname</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.nickname}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">About</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  {user.nickname}, a skilled software engineer, thrives on creative problem-solving. Her proficiency spans full-stack web development, merging front-end finesse with back-end functionality. Beyond code, she's an avid photographer and travel enthusiast, exploring the outdoors and embracing diverse cultures. {user.nickname}'s technical prowess and adaptable nature fuel her innovation and valuable project contributions.
                  </div>
                </div>
                <hr />
                
              </Card.Body>
            </Card>

           

          </Col>
        </Row>
      </div>
    </Container>
    )
  );
};


