import "./SingleCard.css";

const SingleCard = () => {
  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/뒷면.png" alt="card back" />
      </div>
    </div>
  );
};

export default SingleCard;
