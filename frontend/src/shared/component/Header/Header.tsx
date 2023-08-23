import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, SignupButton } from "../Auth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          Your App Name
        </Link>
        {/* <Navbar.Brand href="/">Your App Name</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="mr-auto">
            {isAuthenticated && (
              <>
                <Link to="/todo" className="nav-link">
                  Todo
                </Link>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </>
            )}
          </Nav>
          <div className="nav-bar__buttons">
            {!isAuthenticated && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
            {isAuthenticated && <LogoutButton />}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
