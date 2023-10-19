import React, { useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import DataService from "../services/data-service";
import AuthService from "../services/auth-service";
import { toast } from "../components/Toast";

import "./QuestionInput.scss";

const subjects = [
  { id: 1, name: "Maths" },
  { id: 2, name: "Physics" },
  { id: 3, name: "Literature" },
  { id: 4, name: "Chemistry" },
  { id: 5, name: "Geography" },
  { id: 6, name: "Arts" },
  { id: 7, name: "Biology" },
];

const QuestionInput = ({ sessionId, onSubmitSuccess }) => {
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = !content?.length || !studentId || !subjectId;

  const currentUser = useMemo(() => AuthService.getCurrentUser(), []);
  const isStudent = currentUser?.role === "student";

  useState(() => {
    if (isStudent) {
      setStudentId(currentUser?.id);
    }
  }, [isStudent, currentUser?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    DataService.postQuestion({
      sessionId,
      studentId: Number(studentId),
      subjectId,
      content,
    })
      .then(() => {
        setLoading(false);
        setStudentId("");
        setSubjectId("");
        setContent("");
        onSubmitSuccess();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.message);
      });
  };

  return (
    <Form className="w-100 question-input-wrapper">
      <Row>
        {!isStudent && (
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e?.target?.value)}
              />
            </Form.Group>
          </Col>
        )}
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Select
              value={subjectId}
              onChange={(e) => setSubjectId(e?.target?.value)}
            >
              <option>Choose one subject</option>
              {subjects?.map((s) => (
                <option key={s?.id} value={s?.id}>
                  {s?.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={content}
          onChange={(e) => setContent(e?.target?.value)}
        />
      </Form.Group>
      <Form.Group className="d-flex justify-content-end">
        <Button
          variant={disabled ? "secondary" : "primary"}
          disabled={disabled}
          className="submit-button"
          onClick={handleSubmit}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default QuestionInput;
