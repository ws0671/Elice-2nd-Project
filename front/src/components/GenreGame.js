import React from "react";
const GenreGame = ({ data }) => {
  return (
    <>
      {data &&
        data.map((val, key) => {
          return (
            <div key={key}>
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
            </div>
          );
        })}
    </>
  );
};

export default GenreGame;
