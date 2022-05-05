import React, { useContext, useEffect } from "react";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as Api from "../../api";

const Github = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const Spinner = () => {
    return (
      <div className="text-center">
        <img
          src={`/img/고양이 1.jpg`}
          alt="loading"
          width="800px"
          height="800px"
        />
      </div>
    );
  };

  const githubLogin = async (code) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/auth/github?code=${code}`
      );
      const user = res.data;
      if (user.register) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `회원가입되었습니다. 로그인해주세요 :)`,
          showConfirmButton: false,
          timer: 1500,
        });
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
    } catch (err) {
      alert("로그인 실패");
      navigate("/", { replace: true });
    }
  };
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(githubLogin(code));
  }, []);

  return <Spinner />;
};

export default Github;
