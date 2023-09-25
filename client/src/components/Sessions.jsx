import React, { useEffect, useState } from "react";
import moment from "moment";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Sessions.scss";

import { ICONS, COLORS, pluralize } from "../services/utils";

const Sessions = ({ loading, sessions }) => {
  return (
    <div>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        sessions?.map((day, index) => (
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
                              COLORS[((index + 1) * index2) % COLORS?.length]
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
                            {`Areas of expertise: ${pluralize(
                              tutor?.subjects
                            )}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="register-button" variant="outline-primary">
                    Register
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default Sessions;
