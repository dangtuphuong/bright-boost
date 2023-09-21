import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./routes/login-page";
import HomePage from "./routes/home-page";
import SessionsPage from "./routes/sessions-page";
import SessionDetailPage from "./routes/session-detail-page";

import "./App.scss";

const App = () => {
  React.useEffect(() => {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/sessions/:id" element={<SessionDetailPage />} />
    </Routes>
  );
};

export default App;
