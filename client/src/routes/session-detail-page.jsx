import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import classNames from "classnames";

import NavBar from "../components/NavBar";
import DataService from "../services/data-service";
import { toast } from "../components/Toast";

import "./session-detail-page.scss";

const SessionDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    DataService.getSessionDetail()
      .then((data) => {
        setQuestions(data?.questions || []);
        setStudents(data?.students || []);
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => setLoading(false));
  }, []);

  console.log(questions);

  return (
    <NavBar>
      <div className="container">
        <h2 className="mb-4 mt-4">Session ID: {id}</h2>
        <div className="row mb-4">
          <div className="col-4 gx-5">
            <h4 className="mb-4 text-center">Student List</h4>
            <div className="d-flex flex-column justify-content-center align-items-center">
              {loading ? (
                <Spinner animation="border" />
              ) : (
                students?.map((student) => (
                  <Card
                    key={student?.id}
                    className="mb-3 w-100 student-card"
                    style={
                      student?.isAttended ? {} : { backgroundColor: "#eee" }
                    }
                  >
                    <Card.Body>
                      <div>{student?.name}</div>
                      <div className="color-light">{student?.email}</div>
                      <div className="attend-buttons">
                        <Button
                          className="attend-button"
                          variant="outline-danger"
                        >
                          <i className="material-icons">close</i>
                        </Button>
                        <Button
                          className={classNames("attend-button", {
                            isAttended: student?.isAttended,
                          })}
                          variant={`${
                            student?.isAttended ? "" : "outline-"
                          }success`}
                        >
                          <i className="material-icons">check</i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </div>
          <div className="col-8 gx-5 question-list">
            <h4 className="mb-4 text-center">Question List</h4>
            <div className="d-flex flex-column justify-content-center align-items-center">
              {loading ? (
                <Spinner animation="border" />
              ) : (
                questions?.map((question) => (
                  <Card
                    key={question?.id}
                    className="mb-3 w-100"
                    style={
                      question?.isAnswered
                        ? {
                            backgroundColor: "rgba(214, 234, 223, 0.4)",
                          }
                        : {}
                    }
                  >
                    <Card.Body>
                      <div>{question?.content}</div>
                      <div className="d-flex justify-content-between">
                        <div className="color-light">{`From ${question?.studentName}`}</div>
                        {question?.tutorName && (
                          <div className="color-light">{`Answered by ${question?.tutorName}`}</div>
                        )}
                      </div>
                      {!!question?.isAnswered && (
                        <i className="material-icons check-icon">
                          check_circle
                        </i>
                      )}
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default SessionDetailPage;
