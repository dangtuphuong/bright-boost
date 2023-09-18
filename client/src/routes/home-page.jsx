import React, { useEffect } from "react";

import AuthService from "../services/auth-service";

const HomePage = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <h3>{`Hi ${currentUser ? currentUser?.email : "Guest"}`}</h3>
    </div>
  );
};

export default HomePage;
