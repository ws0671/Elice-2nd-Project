import React, { useMemo } from "react";
import { Row, Col, Form, Pagination } from "react-bootstrap";

const SearchPagination = ({ page, lastPage, limit, setPage, setLimit }) => {
  const pagination = useMemo(() => {
    const pagination = [];
    for (let num = 1; num <= lastPage; num += 200) {
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
  console.log(lastPage);
  return (
    <Row className="justify-content-center mt-3 me-0">
      <Col md={5}>
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
