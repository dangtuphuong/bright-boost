import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Session = ({ className, session, onJoinSession = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleJoin = (e) => (sessionId) => {
    e?.stopPropagation();
    if (onJoinSession) {
      setLoading(true);
      onJoinSession()
        .then(() => {
          toast.success("You have enrolled successfully!");
          navigate(`/sessions/${sessionId}`);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err?.message);
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Card className={`card-item ${className}`}>
      <Card.Body>
        <div className="d-flex">
          <div className="color-light">{`${session?.start} to ${session?.end}`}</div>
          <div className="tutors">
            {session?.TutorDetails?.map((tutor) => (
              <div key={tutor?.tutorId} className="tutor-wrap">
                <Icon />
                <div className="tutor">
                  <div>
                    <strong>Tutor: {tutor?.tutor?.name}</strong>
                    {!!tutor?.tutor?.email && (
                      <span className="color-light text-small text-italic ">{` (${tutor?.tutor?.email})`}</span>
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
            {onJoinSession && (
              <Button
                className={classNames("register-button", {
                  loading: loading,
                })}
                variant="outline-primary"
                onClick={() => handleJoin(session?.id)}
              >
                {loading ? "Joining..." : "Join"}
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Session;
