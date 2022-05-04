import React, { useState, useEffect, useContext } from "react";
import "./MemorizeCards.css";
import SingleCard from "./SingleCard";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";

const cardImages = [
  { src: "/img/고양이 1.jpg", matched: false },
  { src: "/img/고양이 2.jpg", matched: false },
  { src: "/img/고양이 3.jpg", matched: false },
  { src: "/img/고양이 4.jpg", matched: false },
  { src: "/img/고양이 5.jpg", matched: false },
  { src: "/img/고양이 6.jpg", matched: false },
];

const MemorizeCards = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(12);
  const [success, setSuccess] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const userContext = useContext(UserStateContext);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(12);
    setSuccess(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setSuccess((suc) => suc + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prevTurns) => prevTurns - 1);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(async () => {
    if (turns !== 12 && success === 6) {
      const today = await Api.get("point?miniGame=CatMatch");
      if (!today.data.point) {
        alert("축하합니다!! 100포인트를 얻으셨습니다.");
        const point = 100;
        await Api.put(`user/${userContext.user.userId}/addPoint`, {
          point: point,
        });
        await Api.post("point", {
          miniGame: "CatMatch",
          point: point,
        });
      } else {
        alert("성공하셨습니다!!");
      }
      shuffleCards();
    } else if (turns === 0) {
      alert("GAME OVER");
      shuffleCards();
    }
  }, [turns]);

  return (
    <div className="MemorizeCards">
      <h1>CAT MATCH</h1>
      <button onClick={shuffleCards}>NEW GAME</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default MemorizeCards;