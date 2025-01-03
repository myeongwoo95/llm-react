import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useInput } from "../../hooks/useInputs";
import { post } from '../../api/post';
import { useNavigate } from "react-router-dom";

const PostWrite = () => {

  const navigate = useNavigate();

  const [{ title, content }, onChange, onReset] = useInput({
    title: '',
    content: ''
  });

  const onSubmit = async (e) => {
    e.preventDefault()

    if ([title, content].includes("")) {
      alert("빈 칸을 모두 입력하세요.");
      return;
    }

    await post.save({
      title,
      content
    }).then(response => {
      if (response.data.result) {
        onReset()
        alert(response.data.message);
        navigate("/PostList")
        return
      }

      if (response.data.code === "ERROR-COMM-E003") {
        console.error("error log", response.data);
        if (response.data.errorMap["title"]) {
          alert(response.data.errorMap["title"]);
        } else if(response.data.errorMap["content"]){
          alert(response.data.errorMap["name"]);
        }
      } else {
        console.error("error log", response.data);
        alert(response.data.message);
      }
    })
  }

  return (
    <Container className="mt-4">

      <Row>
        <Col>
          <h2 className="text-center mb-4">게시판</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="text-sm-end">제목</Form.Label>
              <Col sm="10">
                <Form.Control onChange={onChange} name="title" value={title} />
              </Col>
            </Form.Group>

            {/* <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="text-sm-end">첨부</Form.Label>
              <Col sm="10">
                <Form.Control type="file" multiple />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2" className="text-sm-end">내용</Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows={5} onChange={onChange} name="content" value={content} />
              </Col>
            </Form.Group>

          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="me-1" variant="secondary" type="button" onClick={onReset}>리셋</Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>제출</Button>
        </Col>
      </Row>
      
    </Container>
  );
};

export default PostWrite;
