import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import "./login-page.scss";
import AuthService from "../services/auth-service";

const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function LoginPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const isEmailValid = !!email?.length && emailRegEx.test(email);
    const isPwValid = !!password?.length;
    if (isEmailValid && isPwValid) {
      setLoading(true);
      setErrors({ email: false, password: false });
      console.log(email, password);
      AuthService.login(email, password).then(
        () => navigate("/home"),
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
    } else {
      setErrors({ email: !isEmailValid, password: !isPwValid });
    }
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
                  className={classNames({ "is-invalid": errors.email })}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={classNames({ "is-invalid": errors.password })}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button onClick={onSubmit}>
                {loading ? <Spinner size="sm" animation="border" /> : "Sign In"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
