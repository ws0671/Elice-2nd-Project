import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const MypageReview = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/gamedetail/${item.gameId}`)}>
      <Card.Body>
        <Card.Title>{item?.review}</Card.Title>
        <Card.Text style={{ textAlign: "end" }}>
          {(item?.createdAt.split("T"))[0]}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MypageReview;
