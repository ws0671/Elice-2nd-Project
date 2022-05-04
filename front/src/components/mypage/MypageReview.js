import { Card } from "react-bootstrap";

const MypageReview = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>리뷰내용</Card.Title>
        <Card.Text style={{ textAlign: "end" }}>작성일</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MypageReview;
