import React, { useContext, useEffect } from "react";
import { DispatchContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Api from "../../api";
import PacmanLoader from "react-spinners/PacmanLoader";
import loadingbg from "../../images/loadingbg.svg";

const Google = () => {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const Spinner = () => {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${loadingbg})`,
          backgroundSize: "100%",
          width: "100%",
        }}
      >
        <div style={{ marginRight: 100, marginBottom: 100 }}>
          <PacmanLoader
            size={30}
            // style={{ marginRight: 100 }}
            color={"rgba(201,138,204,1)"}
          />
        </div>
      </div>
    );
  };

  const googleLogin = async (code) => {
    try {
      const res = await Api.get2(`auth/google?code=${code}`);
      const user = res.data;
      if (user.register) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `회원가입되었습니다.\n로그인해주세요 :)`,
          showConfirmButton: false,
          timer: 2000,
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

        const today = await Api.get2(`point?route=Login`);
        if (!today.data.point) {
          Api.put(`user/${user.userId}/addPoint`, { point: 100 });
          Api.post("point", {
            route: "Login",
            point: 100,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: `축하합니다!`,
            text: `100포인트를 얻으셨습니다!!`,
            showConfirmButton: false,
            timer: 2000,
          });
        }

        navigate("/", { replace: true });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: err.response.data,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/", { replace: true });
    }
  };

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(googleLogin(code));
  }, []);

  return <Spinner />;
};

export default Google;
