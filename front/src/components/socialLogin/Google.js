import React, { useContext, useEffect } from "react";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Google = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const Spinner = () => {
    return (
      <div className="text-center">
        <img
          src={`/img/고양이 2.jpg`}
          alt="loading"
          width="800px"
          height="800px"
        />
      </div>
    );
  };

  const googleLogin = async (code) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/auth/google?code=${code}`
      );
      const user = res.data;
      if (user.register) {
        alert("회원가입되었습니다. 로그인해주세요.");
        navigate("/login", { replace: true });
      } else {
        const jwtToken = user.token;

        sessionStorage.setItem("userToken", jwtToken);
        sessionStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        navigate("/", { replace: true });
      }
    } catch (error) {}
  };
};

export default Google;
