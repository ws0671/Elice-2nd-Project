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
      body: "",
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
      body: ``,
    },
    {
      name: "김신웅",
      position: ["백엔드", "데이터분석"],
      image: fourth,
      body: ``,
    },
    {
      name: "노송희",
      position: ["백엔드"],
      image: fifth,
      body: "",
    },
    {
      name: "신도희",
      position: ["백엔드", "발표"],
      image: sixth,
      body: `게시판과 미니게임 많이 이용해주세요!!
      달빛이 아름다운 밤.
      당신의 마음을 훔치러 가겠습니다 :)`,
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

                <Card.Text>{item.body}</Card.Text>
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
