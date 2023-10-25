import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Session = ({
  className,
  session,
  isAdmin = false,
  hasProgressBar = false,
  onJoinSession = null,
  onStartSession = null,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);

  const handleStart = (e, sessionId) => {
    e?.stopPropagation();
    if (onStartSession) {
      setStarting(true);
      onStartSession(sessionId)
        .then(() => {
          toast.success("You have started the session successfully!");
          setStarting(false);
        })
        .catch((err) => {
          toast.error(err?.message);
          setStarting(false);
        })
        .finally(() => setStarting(false));
    }
  };

  const handleJoin = (e, sessionId) => {
    e?.stopPropagation();
    if (onJoinSession) {
      setLoading(true);
      onJoinSession(session?.id)
        .then(() => {
          toast.success("You have joined the session successfully!");
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
            {hasProgressBar && (
              <ProgressBar
                className="mb-3"
                variant="success"
                now={(session?.num_students / 25) * 100 || 0}
              />
            )}
            {onStartSession && (
              <Button
                className={classNames("register-button", {
                  loading: starting,
                })}
                variant="outline-primary"
                onClick={(e) => handleStart(e, session?.id)}
              >
                {starting ? "Starting..." : "Start"}
              </Button>
            )}
            {onJoinSession && !isAdmin && (
              <Button
                className={classNames("register-button", {
                  loading: loading,
                })}
                variant="outline-primary"
                onClick={(e) => handleJoin(e, session?.id)}
              >
                {loading ? "Joining..." : "Join"}
              </Button>
            )}
            {isAdmin && (
              <Button
                className="register-button"
                variant="outline-primary"
                onClick={() => navigate(`/sessions/${session?.id}`)}
              >
                View
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Session;
