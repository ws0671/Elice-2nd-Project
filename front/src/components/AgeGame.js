import React from "react";
import { Link } from "react-router-dom";

const AgeGame = ({ data }) => {
  console.log(data);
  return (
    <>
      {data &&
        data.map((val, key) => {
          return (
            <Link key={key} to={`/gamedetail/${data[key]["gameId"]}`}>
              <img alt="이미지" src={data[key]["headerImage"]} />
              <div className="flexDiv">
                <div className="numberDiv">
                  <span className="numberSpan">{key + 1}</span>
                </div>
                <div className="detail">
                  <div>{data[key]["name"]}</div>
                  <div>{data[key]["genres"]}</div>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default AgeGame;
