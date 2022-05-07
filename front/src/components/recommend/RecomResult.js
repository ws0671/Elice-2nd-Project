import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import resultImg from "../../images/RecomBg_result_2.svg";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../api";

function RecomResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [recomItem, setRecomItem] = useState([]);
  const userContext = useContext(UserStateContext);
  const userId = userContext.user.userId;

  //genre, answer 값 가져오기
  useEffect(() => {
    console.log(location);
  }, [location]);

  const handleSubmit = () => {
    setLoading(true);
    navigate("/recommend/result/detail", {
      state: {
        recomItem: recomItem,
      },
    });
  };

  useEffect(() => {
    Api.get("gameRecommend/results", userId).then((res) => {
      /*  console.log(res.data) */
      setRecomItem(res.data);
    });
  }, []);

  console.log(recomItem);

  return (
    <>
      <img className="img-fluid" width="100%" src={resultImg} />
      <ResultBox>
        <h1>
          {" "}
          <Button onClick={handleSubmit}>결과보기(지금 결과페이지임)</Button>
        </h1>
      </ResultBox>
    </>
  );
}

export default RecomResult;

const ResultBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
`;
