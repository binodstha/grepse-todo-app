import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Your App Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
};



