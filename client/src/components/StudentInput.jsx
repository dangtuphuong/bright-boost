import React, { useState, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import DataService from "../services/data-service";
import AuthService from "../services/auth-service";
import { toast } from "../components/Toast";

import "./QuestionInput.scss";

const StudentInput = ({ sessionId, onSubmitSuccess }) => {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);

  const disabled = !studentId;

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
    // TODO
    DataService.addStudent({ sessionId, studentId: Number(studentId) })
      .then(() => {
        setLoading(false);
        setStudentId("");
        onSubmitSuccess();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.message);
      });
  };

  return (
    <Form className="mb-3 w-100 question-input-wrapper">
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

export default StudentInput;
