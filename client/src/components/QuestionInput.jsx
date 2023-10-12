import React, { useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import DataService from "../services/data-service";
import AuthService from "../services/auth-service";
import { toast } from "../components/Toast";

import "./QuestionInput.scss";

const QuestionInput = ({ sessionId, onSubmit }) => {
  const [studentId, setStudentId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = !content?.length || !studentId;

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
      content,
    })
      .then(() => {
        setLoading(false);
        setStudentId("");
        setContent("");
        onSubmit();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.message);
      });
  };

  return (
    <Form className="w-100 question-input-wrapper">
      {!isStudent && (
        <Form.Group className="mb-3">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e?.target?.value)}
          />
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
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
