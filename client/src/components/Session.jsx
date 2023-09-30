import React, { memo, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./Session.scss";

import { ICONS, COLORS, pluralize, getRandomInt } from "../services/utils";
import { toast } from "../components/Toast";
import classNames from "classnames";

const Icon = memo(() => (
  <i
    className="material-icons icon"
    style={{
      backgroundColor: `#${COLORS[getRandomInt(COLORS?.length)]}`,
    }}
  >
    {ICONS[getRandomInt(ICONS?.length)]}
  </i>
));

const Session = ({ className, session, onRegister = null }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (onRegister) {
      setLoading(true);
      onRegister()
        .then(() => {
          toast.success("You have enrolled successfully!");
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Card className={`card-item ${className}`}>
      <Card.Body>
        <div className="d-flex">
          <div className="color-light">3:30pm to 5:30pm</div>
          <div className="tutors">
            {session?.TutorDetails?.map((tutor) => (
              <div key={tutor?.tutorId} className="tutor-wrap">
                <Icon />
                <div className="tutor">
                  <div>
                    <strong>{tutor?.tutor?.name}</strong>
                    {!!tutor?.tutor?.email && (
                      <span className="color-light text-small font-italic">{` (${tutor?.tutor?.email})`}</span>
                    )}
                  </div>
                  <div className="color-light">
                    {`Areas of expertise: ${pluralize(
                      tutor?.tutor?.SubjectDetails?.map((i) => i?.subject?.name)
                    )}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {onRegister && (
              <Button
                className={classNames("register-button", {
                  loading: loading,
                })}
                variant="outline-primary"
                onClick={handleRegister}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Session;
