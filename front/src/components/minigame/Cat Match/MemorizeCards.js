import React, { useState, useEffect, useContext } from "react";
import "./MemorizeCards.css";
import SingleCard from "./SingleCard";
import * as Api from "../../../api";
import { UserStateContext } from "../../../App";
import Swal from "sweetalert2";

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

  useEffect(() => {
    const Message = async () => {
      if (turns !== 12 && success === 6) {
        const today = await Api.get2("point?route=CatMatch");
        if (!today.data.point) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `축하합니다`,
            text: `100 포인트를 획득하셨습니다 :)`,
            showConfirmButton: false,
            timer: 2000,
          });
          const point = 100;
          await Api.put(`user/${userContext.user.userId}/addPoint`, {
            point: point,
          });
          await Api.post("point", {
            route: "CatMatch",
            point: point,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            text: `성공하셨습니다 :)`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        shuffleCards();
      } else if (turns === 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `GAME OVER`,
          showConfirmButton: false,
          timer: 2000,
        });

        shuffleCards();
      }
    };
    Message();
  }, [turns]);

  return (
    <div className="CardContainer">
      <div className="MemorizeCards">
        <p className="CardTitle">CAT MATCH</p>
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
        <p className="Turns">Turns: {turns}</p>
      </div>
    </div>
  );
};

export default MemorizeCards;
