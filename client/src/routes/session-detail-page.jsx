import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import classNames from "classnames";

import NavBar from "../components/NavBar";
import QuestionInput from "../components/QuestionInput";
import DataService from "../services/data-service";
import { toast } from "../components/Toast";
import { isEmpty } from "../services/utils";

import "./session-detail-page.scss";

const SessionDetailPage = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const onGetStudents = () => {
    setStudentsLoading(true);
    DataService.getSessionDetail()
      .then((data) => setStudents(data?.students || []))
      .catch((err) => toast.error(err?.message))
      .finally(() => setStudentsLoading(false));
  };

  const onGetQuestions = () => {
    setQuestionsLoading(true);
    DataService.getQuestionList({ sessionId: Number(id) })
      .then((data) => setQuestions(isEmpty(data?.data) ? [] : data?.data))
      .catch((err) => toast.error(err?.message))
      .finally(() => setQuestionsLoading(false));
  };

  useEffect(() => {
    onGetStudents();
    onGetQuestions();
  }, []);

  return (
    <NavBar>
      <div className="container">
        <h2 className="mb-4 mt-4">Session ID: {id}</h2>
        <div className="row mb-4">
          <div className="col-4 gx-5">
            <h4 className="mb-4 text-center">Student List</h4>
            <div className="d-flex flex-column justify-content-center align-items-center">
              {studentsLoading ? (
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
              <QuestionInput sessionId={Number(id)} onSubmit={onGetQuestions} />
              <div className="w-100 mt-3">
                {questionsLoading ? (
                  <Spinner animation="border" />
                ) : (
                  questions?.map((question) => (
                    <Card
                      key={question?.id}
                      className="mb-3 w-100"
                      style={
                        question?.is_answered
                          ? { backgroundColor: "rgba(214, 234, 223, 0.4)" }
                          : {}
                      }
                    >
                      <Card.Body>
                        <div>{question?.content}</div>
                        <div className="d-flex justify-content-between">
                          <div className="color-light">{`From ${question?.student?.name}`}</div>
                          {question?.tutor?.name && (
                            <div className="color-light">{`Answered by ${question?.tutor?.name}`}</div>
                          )}
                        </div>
                        {!!question?.is_answered && (
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
      </div>
    </NavBar>
  );
};

export default SessionDetailPage;
