import React, { useEffect, useState } from "react";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";

import "./home-page.scss";

import NavBar from "../components/NavBar";
import Session from "../components/Session";
import DataService from "../services/data-service";

const HomePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(timetable);

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
            <div className="d-flex flex-column justify-content-center align-items-center">
              {loading ? (
                <Spinner animation="border" />
              ) : (
                timetable?.map((day) => (
                  <div key={day?.id} className="mb-3 w-100">
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
      </div>
    </NavBar>
  );
};

export default HomePage;
