import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, SignupButton } from "../Auth";
import { Link } from "react-router-dom";
import './header.styles.scss';

import { useLocation } from 'react-router-dom';
export const Header: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand text-primary fw-bold">
          Grepsr Todos App
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="d-flex path-link">
            {isAuthenticated && (
              <>
                <Link to="/todo" className={`nav-link ${location.pathname === "/todo" && "fw-bold"} `}>
                  Tasks
                </Link>
                <Link to="/profile" className={`nav-link ${location.pathname === "/profile" &&  "fw-bold"} `}>
                  Profile
                </Link>
              </>
            )}
          </Nav>
          {!isLoading && <div className="nav-bar__buttons">
            {!isAuthenticated && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
            {isAuthenticated && <LogoutButton />}
          </div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
