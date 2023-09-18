import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-page.scss";

import AuthService from "../services/auth-service";

export default function LoginPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(email, password);

    AuthService.login(email, password).then(
      () => {
        navigate("/home");
        window.location.reload();
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col loginImg"></div>
        <div className="col d-flex flex-column justify-content-center align-items-center loginForm">
          <div>
            <h3>Welcome Back!</h3>
            <Form className="formWrap">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={onSubmit}>
                Sign In
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
