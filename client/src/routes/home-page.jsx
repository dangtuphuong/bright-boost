import React, { useEffect, useState } from "react";

import "./home-page.scss";

import AuthService from "../services/auth-service";
import NavBar from "../components/NavBar";
import Sessions from "../components/Sessions";
import DataService from "../services/data-service";

const HomePage = () => {
  const currentUser = AuthService.getCurrentUser();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    DataService.getTimetable()
      .then((data) => setTimetable(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <NavBar>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h2 className="mb-4 mt-4">Timetable</h2>
            <Sessions loading={loading} sessions={timetable} />
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default HomePage;
