import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/post";

const PostList = () => {
  
  const navigate = useNavigate();

  const [ pagination, setPagination ] = useState({
    page: 0,
    size: 10,
    sort: ["createdDate,DESC"]
  })
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {

      setError(null); 
      setLoading(true); 
      setPosts(null);
      
      await post.getList({
        "page": pagination.page,
        "size": pagination.size,
        "sort": pagination.sort
      }).then(response => {
        if (response.data.result) {
          console.log("success log", response.data)
          setPosts(response.data.data)
        } else {
          console.error("error log", response.data);
          alert(response.data.message);
        }
      })
      setLoading(false);  
    };
    fetchPosts();
  }, [pagination]);

  // 페이지 변경
  const onChangePage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  // 페이지 번호 렌더링
  const renderPageNumbers = (groupSize) => {
    const pageGroup = Math.floor(posts.number / groupSize);
    const groupStart = pageGroup * groupSize;
    const groupEnd = Math.min((pageGroup + 1) * groupSize - 1, posts.totalPages - 1);

    return [...Array(groupEnd - groupStart + 1)].map((_, index) => (
      <Pagination.Item
        key={groupStart + index}
        active={groupStart + index === posts.number}
        onClick={() => onChangePage(groupStart + index)}
      >
        {groupStart + index + 1}
      </Pagination.Item>
    ));
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!posts) return null;
  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center mb-4">게시판</h2>
        </Col>

        <Col md={4} className="d-flex justify-content-md-end justify-content-center">
          <Button variant="primary" onClick={() => navigate("/PostWrite")}>글쓰기</Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <colgroup>
          <col width="5%" />
          <col width="80%"/>
          <col width="7.5%"/>
          <col width="*"/>
        </colgroup>

        <thead>
          <tr>
            <th>No</th>
            <th className="text-center">제목</th>
            <th>글쓴이</th>
            <th>작성시간</th>
          </tr>
        </thead>

        <tbody>
          {posts.empty ? (
            <tr>
              <td colSpan="4" className="text-center">게시글이 존재하지 않습니다.</td>
            </tr>
          ) : (
            posts.content.map((post, index) => (
              <tr key={post.postId}>
                <td>
                  <Link to={`/PostDetail/${post.postId}`}>{(posts.totalElements - posts.pageable.offset) - index}</Link>
                </td>
                <td>{post.title}</td>
                <td>날다람쥐</td>
                <td>2022.10.12</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Row className="mt-3 align-items-center">
        <Col md={{ span: 6, offset: 3}} className="d-flex justify-content-center mb-2 mb-md-0">
          <Pagination>
            <Pagination.First onClick={() => onChangePage(0)} disabled={posts.first} />
            <Pagination.Prev onClick={() => onChangePage(Math.max(0, posts.number - 10))} disabled={posts.first} />
            {renderPageNumbers(10)}
            <Pagination.Next onClick={() => onChangePage(Math.min(posts.totalPages - 1, posts.number + 10))} disabled={posts.last} />
            <Pagination.Last  onClick={() => onChangePage(posts.totalPages - 1)} disabled={posts.last} />
          </Pagination>
        </Col>
      </Row>
     
    </Container>
  );
};

export default PostList;
