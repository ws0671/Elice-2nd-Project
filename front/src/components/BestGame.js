import React from "react";
import { Link } from "react-router-dom";
const BestGame = ({ data }) => {
  return (
    <>
      <Link to="">
        <img alt="이미지" src={data[4][17]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">1</span>
          </div>
          <div className="detail">
            <div>{data[0][17]}</div>
            <div>{data[3][17]}</div>
          </div>
        </div>
      </Link>
      <div>
        <img alt="이미지" src={data[4][21]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">2</span>
          </div>
          <div className="detail">
            <div>{data[0][21]}</div>
            <div>{data[3][21]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][23]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">3</span>
          </div>
          <div className="detail">
            <div>{data[0][23]}</div>
            <div>{data[3][23]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][1120]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">4</span>
          </div>
          <div className="detail">
            <div>{data[0][1120]}</div>
            <div>{data[3][1120]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][1398]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">5</span>
          </div>
          <div className="detail">
            <div>{data[0][1398]}</div>
            <div>{data[3][1398]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][1943]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">6</span>
          </div>
          <div className="detail">
            <div>{data[0][1943]}</div>
            <div>{data[3][1943]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][1962]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">7</span>
          </div>
          <div className="detail">
            <div>{data[0][1962]}</div>
            <div>{data[3][1962]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][2964]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">8</span>
          </div>
          <div className="detail">
            <div>{data[0][2964]}</div>
            <div>{data[3][2964]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][3036]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">9</span>
          </div>
          <div className="detail">
            <div>{data[0][3036]}</div>
            <div>{data[3][3036]}</div>
          </div>
        </div>
      </div>
      <div>
        <img alt="이미지" src={data[4][7577]} />
        <div className="flexDiv">
          <div className="numberDiv">
            <span className="numberSpan">10</span>
          </div>
          <div className="detail">
            <div>{data[0][7577]}</div>
            <div>{data[3][7577]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestGame;
