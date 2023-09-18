import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./routes/login-page";
import HomePage from "./routes/home-page";

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
    </Routes>
  );
};

export default App;
