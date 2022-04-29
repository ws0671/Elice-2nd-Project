import "./MemorizeCards.css";

const cardImages = [
  { src: "/img/고양이 1.jpg", matched: false },
  { src: "/img/고양이 2.jpg", matched: false },
  { src: "/img/고양이 3.jpg", matched: false },
  { src: "/img/고양이 4.jpg", matched: false },
  { src: "/img/고양이 5.jpg", matched: false },
  { src: "/img/고양이 6.jpg", matched: false },
];

const MemorizeCards = () => {
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages];
  };

  return (
    <div className="MemorizeCards">
      <h1>CAT MATCH</h1>
      <button>NEW GAME</button>
    </div>
  );
};

export default MemorizeCards;
