import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import "./sessions-page.scss";

import NavBar from "../components/NavBar";
import Session from "../components/Session";
import DataService from "../services/data-service";
import AuthService from "../services/auth-service";

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useMemo(() => AuthService.getCurrentUser(), []);

  useEffect(() => {
    setLoading(true);
    // TODO change to available sessions
    DataService.getTimetable()
      .then((data) => setSessions(data?.data))
      .finally(() => setLoading(false));
  }, []);

  const onStartSession = (sessionId) =>
    DataService.onStartSession({ sessionId });

  const onJoinSession = (sessionId) =>
    DataService.onJoinSession({
      sessionId,
      userId: currentUser?.id,
      role: currentUser?.role,
    });

  return (
    <NavBar>
      <div className="container">
        <h2 className="mb-4 mt-4">Your Sessions</h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            sessions?.map((session) => (
              <div key={session?.id} className="mb-3 w-75">
                <h5 className="mb-3">{session?.date}</h5>
                <Link className="session-item" to={`/sessions/${session?.id}`}>
                  <Session
                    className="session-item-card"
                    session={session}
                    onJoinSession={
                      currentUser?.role === "student" ? null : onJoinSession
                    }
                    onStartSession={onStartSession}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </NavBar>
  );
};

export default SessionsPage;
