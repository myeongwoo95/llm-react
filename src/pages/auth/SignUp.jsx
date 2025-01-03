import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../api/auth";

const SignUp = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const { name, email, password, passwordCheck } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, passwordCheck].includes("")) {
      alert("빈 칸을 모두 입력하세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    await auth.join({
        name,
        email,
        password,
      })
      .then((response) => {
        if (response.data.result) {
          alert(response.data.message);
          onReset();
          navigate("/SignIn");
        } else {
          if (response.data.code === "ERROR-COMM-E003") {
            if (response.data.errorMap["name"]) {
              alert(response.data.errorMap["name"]);
            } else if (response.data.errorMap["email"]) {
              alert(response.data.errorMap["email"]);
            } else if (response.data.errorMap["password"]) {
              alert(response.data.errorMap["password"]);
            }
          } else {
            console.log(response.data);
            alert(response.data.message);
          }
        }
      });
  };

  return (
    <Container fluid className="d-flex justify-content-center">
      <Row className="w-100">
        <Col className="offset-3 col-6">
          <h1 className="text-center m-5">회원가입</h1>

          <Form className="p-4 shadow-sm bg-light rounded">
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="4">
                이름
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="이름"
                  className="bg-light border rounded"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="4">
                이메일
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  placeholder="email"
                  className="bg-light border rounded"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="4">
                비밀번호
              </Form.Label>
              <Col sm="8 mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="bg-light border rounded"
                  name="password"
                  value={password}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPasswordCheck"
            >
              <Form.Label column sm="4">
                비밀번호 확인
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="bg-light border rounded"
                  name="passwordCheck"
                  value={passwordCheck}
                  onChange={onChange}
                />
              </Col>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={onSubmit}
            >
              회원가입
            </Button>

            <Row className="w-100 mt-3">
              <Col>
                <Link className="offset-10 col-2" to="/SignIn">
                  로그인
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
