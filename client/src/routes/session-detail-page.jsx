import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import classNames from "classnames";

import NavBar from "../components/NavBar";
import QuestionInput from "../components/QuestionInput";
import DataService from "../services/data-service";
import AuthService from "../services/auth-service";
import { toast } from "../components/Toast";
import { isEmpty } from "../services/utils";

import "./session-detail-page.scss";

const SessionDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ending, setEnding] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentUser = useMemo(() => AuthService.getCurrentUser(), []);

  useEffect(() => {
    onGetStudents();
    onGetQuestions();
  }, []);

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

  const onLeaveSession = () => {
    setLeaving(true);
    DataService.onLeaveSession({
      sessionId: Number(id),
      userId: currentUser?.id,
      role: currentUser?.role,
    })
      .then(() => {
        setLeaving(false);
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err?.message);
        setLeaving(false);
      });
  };

  const onEndSession = () => {
    setEnding(true);
    DataService.onEndSession({
      sessionId: Number(id),
    })
      .then(() => {
        setEnding(false);
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err?.message);
        setEnding(false);
      });
  };

  const onAnswering = (question) => {
    setShowModal(true);
    setCurrentQuestion(question);
  };

  const onFinishAnswer = () => {
    setShowModal(false);
    setCurrentQuestion(null);
  };

  const handleStartAnswer = (question) =>
    DataService.onStartAnswer({ id: question?.id, tutorId: currentUser?.id })
      .then(() => {
        toast.success("Question is answering..");
        onAnswering(question);
      })
      .catch((err) => toast.error(err.message));

  const handleEndAnswer = () =>
    DataService.onEndAnswer({
      id: currentQuestion?.id,
      tutorId: currentUser?.id,
    })
      .then(() => {
        toast.success("Question is answered!");
        onFinishAnswer();
      })
      .catch((err) => {
        toast.error(err.message);
        onFinishAnswer();
      });

  return (
    <NavBar>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="mb-4 mt-4">Session ID: {id}</h2>
          <div>
            <Button variant="warning" onClick={onLeaveSession}>
              {leaving ? "Leaving" : "Leave Session"}
            </Button>
            {currentUser?.role === "tutor" && (
              <Button className="ms-3" variant="danger" onClick={onEndSession}>
                {ending ? "Ending" : "End Session"}
              </Button>
            )}
          </div>
        </div>
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
                      onDoubleClick={
                        currentUser?.role === "tutor"
                          ? () => handleStartAnswer(question)
                          : null
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
          <Modal
            show={showModal}
            onHide={handleEndAnswer}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Answering...</Modal.Title>
            </Modal.Header>
            <Modal.Body>{currentQuestion?.content}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleEndAnswer}>
                End
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </NavBar>
  );
};

export default SessionDetailPage;
