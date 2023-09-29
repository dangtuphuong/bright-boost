import React, { memo, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";

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
            {session?.tutors?.map((tutor) => (
              <div key={tutor?.name} className="tutor-wrap">
                <Icon />
                <div className="tutor">
                  <div>
                    <strong>{tutor?.name}</strong>
                  </div>
                  <div className="color-light">
                    {`Areas of expertise: ${pluralize(tutor?.subjects)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {typeof session?.count === "number" && (
              <ProgressBar
                className="mb-4"
                variant="success"
                now={session?.count}
              />
            )}
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
