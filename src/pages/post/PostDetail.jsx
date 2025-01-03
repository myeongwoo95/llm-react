import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { post } from '../../api/post';

const PostDetail = () => {

  const navigate = useNavigate();
  const { postId } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState()

  useEffect(() => {
    const fetchData = async () => {

      setError(null); 
      setLoading(true); 
      setDetail(null);

      await post.getOne({
        "postId": postId
      }).then(response => {
        if (response.data.result) {
          console.log("success log", response.data)
          setDetail(response.data.data)
        } else {
          console.error("error log", response.data);
          alert(response.data.message);
        }
      })
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!detail) return null;

  const onRemove = async (e) => {
    e.preventDefault();

    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      // try {
      //   await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      //   navigate('/posts'); // 삭제 후 게시글 목록으로 이동
      // } catch (error) {
      //   console.error('게시글 삭제에 실패했습니다:', error);
      // }
    }

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
                <Form.Control name="title" readOnly value={detail.title} />
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
                <Form.Control as="textarea" rows={5} name="content" readOnly value={detail.content} />
              </Col>
            </Form.Group>

          </Form>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex justify-content-center">
          <Button variant="primary" onClick={() => navigate(-1)} className='me-2'>목록으로</Button>
          <Button variant="danger" onClick={onRemove}>삭제</Button>
        </Col>
      </Row>
      
    </Container>
  );
};

export default PostDetail;