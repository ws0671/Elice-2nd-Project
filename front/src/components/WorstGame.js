import React from "react";
const WorstGame = ({ data }) => {
  return (
    <>
      <div>
        <img alt="이미지" src={data[4][2051]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">1</span>
          </div>
          <div className="detail">
            <div>{data[0][2051]}</div>
            <div>{data[3][2051]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][2563]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">2</span>
          </div>
          <div className="detail">
            <div>{data[0][2563]}</div>
            <div>{data[3][2563]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][2618]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">3</span>
          </div>
          <div className="detail">
            <div>{data[0][2618]}</div>
            <div>{data[3][2618]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][2991]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">4</span>
          </div>
          <div className="detail">
            <div>{data[0][2991]}</div>
            <div>{data[3][2991]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][5090]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">5</span>
          </div>
          <div className="detail">
            <div>{data[0][5090]}</div>
            <div>{data[3][5090]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][5259]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">6</span>
          </div>
          <div className="detail">
            <div>{data[0][5259]}</div>
            <div>{data[3][5259]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][11994]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">7</span>
          </div>
          <div className="detail">
            <div>{data[0][11994]}</div>
            <div>{data[3][11994]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][12836]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">8</span>
          </div>
          <div className="detail">
            <div>{data[0][12836]}</div>
            <div>{data[3][12836]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][13020]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">9</span>
          </div>
          <div className="detail">
            <div>{data[0][13020]}</div>
            <div>{data[3][13020]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][21463]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">10</span>
          </div>
          <div className="detail">
            <div>{data[0][21463]}</div>
            <div>{data[3][21463]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorstGame;
