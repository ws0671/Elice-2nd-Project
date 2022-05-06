import React from "react";
import { Link } from "react-router-dom";

function DataExpression({ data, inputData, genre, mode, age, flatForm }) {
  return (
    <div className="box">
      {mode === "전체 목록" &&
        data &&
        data.games
          .filter((val) => {
            if (inputData === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(inputData.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <Link
                key={key}
                to={`/gamedetail/${val["gameId"]}`}
                className="imgWrap"
              >
                <img
                  src={val.headerImage}
                  alt="게임 이미지"
                  style={{ width: "400px" }}
                />
                <div className="text">
                  <h5>{val.name}</h5>
                  <div>{val.developer[0]}</div>
                  <div>{val.releaseDate.split("T")[0]}</div>
                  <div>{val.price} \</div>
                  <div>{val.positiveRate}점</div>
                </div>
              </Link>
            );
          })}
      {mode === "장르" &&
        genre &&
        genre.map((val, key) => (
          <div
            key={key}
            style={{
              width: "400px",
              height: "224px",
              opacity: 1,
              background: "linear-gradient(lightCyan, skyBlue, deepSkyBlue)",
              color: "white",
              position: "relative",
            }}
          >
            <h3
              style={{
                position: "absolute",
                fontWeight: "bold",
                right: "10px",
                bottom: "0",
              }}
            >
              {val}
            </h3>
          </div>
        ))}
      {mode === "플랫폼" &&
        flatForm &&
        flatForm.map((val, key) => (
          <img
            key={key}
            src={val.headerImage}
            style={{ width: "300px", height: "300px", opacity: 1 }}
            alt="플랫폼 이미지"
          />
        ))}
      {mode === "이용등급" &&
        age &&
        age.map((val, key) => (
          <img
            key={key}
            src={val.headerImage}
            style={{ width: "300px", opacity: 1 }}
            alt="이용등급 이미지"
          />
        ))}
    </div>
  );
}

export default DataExpression;
