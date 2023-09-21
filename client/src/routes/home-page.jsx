import React, { useEffect } from "react";

import "./home-page.scss";

import AuthService from "../services/auth-service";
import NavBar from "../components/NavBar";

const HomePage = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <NavBar>
      <div className="container">
        <h1>{`Hi ${currentUser ? currentUser?.email : "Guest"}`}</h1>
      </div>
    </NavBar>
  );
};

export default HomePage;
