import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Api from "../../api";
import { UserStateContext } from "../../App"
import { ButtonWrapper, Button } from "./ResultDetailStyle"
import { BodyStyle, ChartWrapper, QnaBox, AnswerButton } from "./RecomStyle";
import RecomSlider from "./RecomSlider";
import RecomChart from "./RecomChart";

function RecomResultDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const userContext = useContext(UserStateContext);
  const userId = userContext.user.userId;
  const [category, setCategory] = useState([]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [gameItem, setGameItem] = useState([]);

  const getCurrentIdx = (currentIdx) => {
    setCurrentIdx(currentIdx);
  };

  const refresh = () => {
    Api.delete("gameRecommend", userId);
    navigate("/recommend");
  };

  const making = (v) => {
    let realTagData = [];
    const result = {};
    if (v) {
      for (var i in v) {
        for (var j in v[i]) {
          realTagData.push(v[i][j]);
        }
      }
    }
    realTagData.forEach((x) => {
      result[x] = (result[x] || 0) + 1;
    });

    return Object.keys(result).map((name) => ({
      name,
      value: result[name],
      fullMark: 5,
    }));
  };

  useEffect(() => {
    setGameItem(location.state.recomItem);
    setCategory(
      making(location.state.recomItem?.map((v) => v.categories))
        .sort(function (a, b) {
          return b.value - a.value;
        })
        .splice(0, 6)
    );
  }, []);


  return (
    <div>
      <BodyStyle>
        <RecomSlider gameItem={gameItem} getCurrentIdx={getCurrentIdx} />
        <RecomChart category={category} />
        <ButtonWrapper>
          <Button onClick={refresh}>처음부터 다시!</Button>
        </ButtonWrapper>
      </BodyStyle>
    </div>
  );
}

export default RecomResultDetail;

