import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
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
  const [point, setPoint] = useState();
  const userContext = useContext(UserStateContext);

  const checkPoint = async () => {
    const today = await Api.get2("point?route=CatMatch");
    setPoint(today.data.point);
    if (today.data.point) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Notice",
        html: "오늘은 이미 100포인트를 얻으셨습니다.<br />게임은 무한으로 즐겨주세요😁",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    Swal.fire({
      position: "center",
      title: "Rules Of Card Match",
      icon: "info",
      html: "<p>🐈💖🐈🧡🐈💛🐈💚🐈💙🐈💜🐈🤍🐈🖤🐈</br>카드를 뒤집어서 귀여운 고양이의 짝을 맞춰주세요</br>카드를 클릭하면 뒤집을 수 있답니다 ヾ(≧▽≦*)o<br>(っ °Д °;)っ 12번 안에 clear하지 못 하면 게임오버예요!!</br></br>※포인트를 받을 수 있는 건 하루에 한 번 뿐입니다.※</p>",
      showConfirmButton: true,
    }).then((res) => {
      checkPoint();
    });
  }, []);

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
        if (!point) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            html: "축하합니다!! 100포인트를 얻으셨습니다🎉",
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
          setPoint(100);
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            text: `성공하셨습니다 🤩`,
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
