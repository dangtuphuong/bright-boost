import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

import "./sessions-page.scss";

import NavBar from "../components/NavBar";

const SessionsPage = () => {
  return (
    <NavBar>
      <div className="container">
        <h1>SessionsPage</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Link className="session-item" to="/sessions/123">
            <Card className="session-item-card">
              <Card.Body>
                <Card.Title>Session #123</Card.Title>
                <Card.Text>Session #123 Details</Card.Text>
              </Card.Body>
            </Card>
          </Link>
          <Link className="session-item" to="/sessions/124">
            <Card className="session-item-card">
              <Card.Body>
                <Card.Title>Session #124</Card.Title>
                <Card.Text>Session #124 Details</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    </NavBar>
  );
};

export default SessionsPage;
