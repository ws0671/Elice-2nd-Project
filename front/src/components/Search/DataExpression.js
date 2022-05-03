import React from "react";

function DataExpression({ data, inputData, mode, age, flatForm }) {
  return (
    <div>
      {mode === "전체 목록" &&
        data &&
        data
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
              <div>
                <img
                  key={key}
                  src={val.headerImage}
                  alt="게임 이미지"
                  style={{ width: "400px" }}
                />
                <div className="noneDiv">
                  <h5>{val.name}</h5>
                  <div>{val.developer[0]}</div>
                  <div>{val.releaseDate.split("T")[0]}</div>
                  <div>{val.price}</div>
                  <div>별점</div>
                </div>
              </div>
            );
          })}
      {mode === "플랫폼" &&
        flatForm &&
        flatForm.map((val, key) => (
          <img
            key={key}
            src={val.headerImage}
            style={{ width: "400px", height: "224px", opacity: 1 }}
            alt="이용등급 이미지"
          />
        ))}
      {mode === "이용등급" &&
        age &&
        age.map((val, key) => (
          <img
            key={key}
            src={val.headerImage}
            style={{ width: "400px", opacity: 1 }}
            alt="이용등급 이미지"
          />
        ))}
    </div>
  );
}

export default DataExpression;
