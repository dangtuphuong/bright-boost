import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";

import "./sessions-page.scss";

import NavBar from "../components/NavBar";

const SessionsPage = () => {
  return (
    <NavBar>
      <div className="container">
        <h1>SessionsPage</h1>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Card className="session-item">
            <Link to="/sessions/123">
              <Button variant="link">View Session #123</Button>
            </Link>
          </Card>
          <Card className="session-item">
            <Link to="/sessions/124">
              <Button variant="link">View Session #124</Button>
            </Link>
          </Card>
        </div>
      </div>
    </NavBar>
  );
};

export default SessionsPage;
