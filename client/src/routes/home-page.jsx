import React, { useEffect, useState, useMemo } from "react";
import Spinner from "react-bootstrap/Spinner";

import "./home-page.scss";

import NavBar from "../components/NavBar";
import Session from "../components/Session";
import DataService from "../services/data-service";
import AuthService from "../services/auth-service";

const HomePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useMemo(() => AuthService.getCurrentUser(), []);

  useEffect(() => {
    setLoading(true);
    DataService.getTimetable()
      .then((data) => setTimetable(data?.data))
      .finally(() => setLoading(false));
  }, []);

  const onStartSession = (sessionId) =>
    DataService.onStartSession({ sessionId });

  return (
    <NavBar>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2 className="mb-4 mt-4">Timetable</h2>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            timetable?.map((item) => (
              <div key={item?.id} className="mb-3 w-75">
                <h5 className="mb-3">{item?.date}</h5>
                <Session
                  session={item}
                  onStartSession={
                    currentUser?.role === "tutor" && onStartSession
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
    </NavBar>
  );
};

export default HomePage;
