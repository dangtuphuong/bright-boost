import React, { useEffect, useState } from "react";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./home-page.scss";

import AuthService from "../services/auth-service";
import NavBar from "../components/NavBar";
import DataService from "../services/data-service";
import { ICONS, COLORS } from "../services/utils";

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
        <h2 className="mb-4 mt-4">Timetable</h2>
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div>
            {timetable?.map((day, index) => (
              <div key={day?.day} className="mb-3">
                <h5 className="mb-3">
                  {moment(day?.day).format("dddd DD.MM.YYYY")}
                </h5>
                <Card className="card-item">
                  <Card.Body>
                    <div className="d-flex">
                      <div className="color-light">3:30pm to 5:30pm</div>
                      <div className="tutors">
                        {day?.tutors?.map((tutor, index2) => (
                          <div key={tutor?.name} className="tutor-wrap">
                            <i
                              className="material-icons icon"
                              style={{
                                backgroundColor: `#${
                                  COLORS[
                                    ((index + 1) * index2) % COLORS?.length
                                  ]
                                }`,
                              }}
                            >
                              {ICONS[Math.floor(Math.random() * ICONS?.length)]}
                            </i>
                            <div className="tutor">
                              <div>
                                <strong>{tutor?.name}</strong>
                              </div>
                              <div className="color-light">
                                {`Areas of expertise: ${tutor?.subjects?.join(
                                  ", "
                                )}`}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="register-button"
                        variant="outline-primary"
                      >
                        Register
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavBar>
  );
};

export default HomePage;
