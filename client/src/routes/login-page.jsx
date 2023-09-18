import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-page.scss";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const onSubmit = () => console.log(email, pass);

  return (
    <div className="container">
      <div className="row">
        <div className="col loginImg"></div>
        <div className="col d-flex justify-content-center align-items-center loginForm">
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
                onChange={(e) => setPass(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={onSubmit}>
              Sign In
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
