import React, { useMemo } from "react";
import { Row, Col, Form, Pagination } from "react-bootstrap";

const SearchPagination = ({ page, lastPage, limit, setPage, setLimit }) => {
  const pagination = useMemo(() => {
    const pagination = [];
    for (let num = 1; num <= lastPage; num += 10000) {
      pagination.push(
        <Pagination.Item
          key={num}
          active={num === page}
          onClick={() => setPage(num)}
        >
          {num}
        </Pagination.Item>
      );
    }
    return pagination;
  }, [lastPage, page]);

  return (
    <Row className="justify-content-center mt-3 me-0">
      <Col md={1} xs={3}>
        <Form.Select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(e.target.value);
          }}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </Form.Select>
      </Col>
      <Col md={2} xs={5}>
        <Pagination>
          <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage((cur) => cur - 1)}
          />
          {pagination}
          <Pagination.Next
            disabled={page === lastPage}
            onClick={() => setPage((cur) => cur + 1)}
          />
          <Pagination.Last
            disabled={page === lastPage}
            onClick={() => setPage(lastPage)}
          />
        </Pagination>
      </Col>
    </Row>
  );
};

export default SearchPagination;
