import React, { useCallback, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import navLogo from "../images/navLogo.png"

import AuthService from "../services/auth-service";

const AdminNavBar = ({ setService }) => {
    const navigate = useNavigate();

    const currentUser = useMemo(() => AuthService.getCurrentUser(), []);

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
        <div>
            <Container>
                <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                <Container>
                <Navbar.Brand href="/"> 
                        <img src={navLogo} width="150" className="d-inline-block align-top" alt="Bright Boost"/>
                </Navbar.Brand>
                    <Nav className="me-auto navMenu">
                    <Nav.Link className="btn btn-primary" onClick={() => setService("Student")}>Student</Nav.Link>
                    <Nav.Link className="btn btn-primary" onClick={() => setService("Question")}>Question</Nav.Link>
                    </Nav>
                    {currentUser ? (
                    <Nav>
                        <Navbar.Text>Signed in as: </Navbar.Text>
                        <NavDropdown
                        align="end"
                        title={currentUser?.name || currentUser?.email}
                        >
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
        </div>
    );
}

export default AdminNavBar;