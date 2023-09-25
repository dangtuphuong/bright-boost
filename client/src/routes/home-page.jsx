import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import "./home-page.scss";

import AuthService from "../services/auth-service";
import NavBar from "../components/NavBar";
import Session from "../components/Session";
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

  const onRegister = () => DataService.onRegister();

  return (
    <NavBar>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h2 className="mb-4 mt-4">Timetable</h2>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              timetable?.map((day) => (
                <div key={day?.id} className="mb-3">
                  <h5 className="mb-3">
                    {moment(day?.day).format("dddd DD.MM.YYYY")}
                  </h5>
                  <Session session={day} onRegister={onRegister} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default HomePage;
