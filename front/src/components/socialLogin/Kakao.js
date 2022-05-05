import React, { useContext, useEffect } from "react";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const Spinner = () => {
    return (
      <div className="text-center">
        <img
          src={`/img/고양이 3.jpg`}
          alt="loading"
          width="800px"
          height="800px"
        />
      </div>
    );
  };

  const kakaoLogin = async (code) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/auth/kakao?code=${code}`
      );
    } catch (err) {
      alert("로그인 실패");
      navigate("/", { replace: true });
    }
  };
};

export default Kakao;
