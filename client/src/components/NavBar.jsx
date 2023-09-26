import React, { useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth-service";

const NavBar = ({ children }) => {
  const navigate = useNavigate();

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    if (!currentUser?.accessToken) {
      navigate("/login");
    }
  }, [currentUser?.accessToken]);

  const onLogout = useCallback((e) => {
    e.preventDefault();
    AuthService.logout().then(
      () => navigate("/login"),
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Container>
        <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/sessions">Sessions</Nav.Link>
            </Nav>
            {currentUser ? (
              <Nav>
                <Navbar.Text>Signed in as: </Navbar.Text>
                <NavDropdown title={currentUser?.email}>
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Button variant="primary" href="/login">
                  Login
                </Button>
              </Nav>
            )}
          </Container>
        </Navbar>
      </Container>
      {children}
    </>
  );
};

export default NavBar;
