import { Card, Badge } from "react-bootstrap";
import styled from "styled-components";
import first from "../images/first.png";
import second from "../images/second.png";
import third from "../images/third.png";
import fourth from "../images/fourth.png";
import fifth from "../images/fifth.png";
import sixth from "../images/sixth.png";
import team from "../images/team.png";
const TeamInfo = () => {
  const data = [
    {
      name: "이영민",
      position: ["프론트엔드", "팀장"],
      image: first,
      body: `안녕하세요 저는 프론트엔드 개발을 맡았습니다. 꾸준하게 개발하는 개발자가 되는게 목표입니다.`,
    },
    {
      name: "강주희",
      position: ["프론트엔드"],
      image: second,
      body: `많은 소통과 공식 문서의 중요성을 깊이 느끼게 되는 프로젝트였습니다ㅎㅎ 
      디자인은 아직까지 참 많이 어려운 것 같습니다😂`,
    },
    {
      name: "이은여울",
      position: ["프론트엔드"],
      image: third,
      body: `3주라는 기간에 많은 것을 배웠고, 다음번에는 구상한 대로 만들 수 있도록 열심히 공부해야겠다는 생각이 들었습니다.`,
    },
    {
      name: "김신웅",
      position: ["백엔드", "데이터분석"],
      image: fourth,
      body: `동기부여도 되고 많이 배우면서 무사히
      마칠 수 있었던 것 같습니다. 다음 시도에는 더 잘 할 수 있겠다는 생각이 들었습니다!`,
    },
    {
      name: "노송희",
      position: ["백엔드"],
      image: fifth,
      body: `기획, 디자인, 기능 추가까지 팀원들과 함께 새로운 걸 시도하고 그 과정 속에서 많은 걸 배울 수 있어 좋았습니다.`,
    },
    {
      name: "신도희",
      position: ["백엔드", "발표"],
      image: sixth,
      body: `게시판과 미니게임 많이 이용해주세요!! 달빛이 아름다운 밤. 당신의 마음을 훔치러 가겠습니다 :)`,
    },
  ];

  const color = (v) => {
    if (v === "프론트엔드") {
      return "info";
    } else if (v === "발표") {
      return "success";
    } else if (v === "팀장") {
      return "warning";
    } else if (v === "백엔드") {
      return "secondary";
    } else if (v === "데이터분석") {
      return "dark";
    }
  };
  return (
    <Div imgUrl={team}>
      <div style={{ height: 50 }}></div>
      <div style={{ height: "130vh", margin: "30px 0" }}>
        <div className="teamTitle" style={{ textAlign: "center" }}>
          {" "}
          저희 6팀을 소개합니다.
        </div>
        <div className="teamCard">
          {data.map((item) => (
            <Card className="element">
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={item.image}
                  alt="프로필"
                  className="cardImage"
                  style={{ width: 250 }}
                />
                <Card.Title>{item.name}</Card.Title>
                {/* <Card.Subtitle> */}
                <div className="badges">
                  {item.position.map((v) => (
                    <Badge pill bg={color(v)} className="badgesItem">
                      <div style={{ paddingLeft: 5 }}>{v}</div>
                    </Badge>
                  ))}
                </div>
                {/* </Card.Subtitle> */}

                <Card.Text style={{ margin: "10px 0" }}>{item.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Div>
  );
};

const Div = styled.div`
  background: ${(props) => `url(${props.imgUrl})`};
  background-size: 150%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  .teamTitle {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
    color: white;
  }
  .teamCard {
    height: 100vh;
    width: 85vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    // align-items: center;
    flex-wrap: wrap;

    .element {
      width: 25vw;
      margin: 20px;
      background: rgba(255, 255, 255, 0.6);
      box-shadow: 0 8px 32px #6869d0;
      backdrop-filter: blur(2.5px);
      border-radius: 10px;

      text-transform: uppercase;
      letter-spacing: 0.4rem;
      text-align: center;
    }
    .badges {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .badgesItem {
        margin: 0 5px;
      }
      .cardImage {
        height: 200px;
      }
    }
  }
`;

export default TeamInfo;
