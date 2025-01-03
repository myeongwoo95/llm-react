import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { saveToken, saveUserInfo } from "../../utils/localStorage";
import { auth } from './../../api/auth';

const SignIn = () => {
  const { setLoggedUser, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "user@example.com",
    password: "1234",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = () => {
    setInputs({
      email: "",
      password: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      alert("빈 칸을 모두 입력하세요.");
      return;
    }

    await auth
      .login({
        email,
        password,
      })
      .then((response) => {
        if (response.data.result) {
          const jwt = response.headers.get("Authorization");
          if (jwt !== null || jwt !== undefined || jwt !== "") {

            const userInfo = {
              "userId": response.data.data.userId,
              "role": response.data.data.role,
              "name": response.data.data.name,
              "email": response.data.data.email,
            }

            onReset()

            saveToken(jwt);
            saveUserInfo(userInfo)

            setLoggedIn();
            setLoggedUser({
              userId: userInfo.userId,
              name: userInfo.name,
              email: userInfo.email,
              // roles: [],
              role: userInfo.role,
            });

            alert(response.data.message);
            navigate("/");
          } else {
            alert("토큰이 존재하지 않거나 손상되었습니다.");
          }
        } else {
          // 유효성 에러라면
          if (response.data.errorCode === "COMM-E003") {
            if (response.data.errorMap["email"]) {
              alert(response.data.errorMap["email"]);
            } else if (response.data.errorMap["password"]) {
              alert(response.data.errorMap["password"]);
            }
          } else {
            alert(response.data.message);
          }
        }
      });
  };

  return (
    <Container fluid className="d-flex justify-content-center">
      <Row className="w-100">
        <Col className="offset-3 col-6">
          <h1 className="text-center m-5">로그인</h1>
          <Form className="p-4 shadow-sm bg-light rounded">
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
              <Col sm="8">
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

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={onSubmit}
            >
              로그인
            </Button>

            <Row className="w-100 mt-3">
              <Col>
                <Link className="offset-10 col-2" to="/SignUp">
                  회원가입
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
