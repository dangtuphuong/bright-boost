import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
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
        <div className="row">
          <div className="col">
            <h4 className="mb-4">Student List</h4>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              students?.map((student) => (
                <Card className="mb-3" key={student?.id}>
                  <Card.Body>
                    <div>{student?.name}</div>
                    <div className="color-light">{student?.email}</div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
          <div className="col">
            <h4 className="mb-4">Question List</h4>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              questions?.map((question) => (
                <Card
                  key={question?.id}
                  className={classNames("mb-3", {
                    answered: question?.isAnswered,
                  })}
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
                      <i className="material-icons check-icon">check_circle</i>
                    )}
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default SessionDetailPage;
