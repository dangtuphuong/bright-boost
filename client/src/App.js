import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./routes/login-page";
import HomePage from "./routes/home-page";
import SessionsPage from "./routes/sessions-page";
import SessionDetailPage from "./routes/session-detail-page";
import AdminPage from "./routes/admin-page";

import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/sessions/:id" element={<SessionDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
