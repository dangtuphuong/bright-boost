import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";

const SessionDetailPage = () => {
  const { id } = useParams();

  return (
    <NavBar>
      <div className="container">
        <h1>SessionDetailPage</h1>
        <p>Session ID: {id}</p>
      </div>
    </NavBar>
  );
};

export default SessionDetailPage;
