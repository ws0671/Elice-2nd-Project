import { Card, Badge } from "react-bootstrap";
import styled from "styled-components";
const TeamInfo = () => {
  const data = [
    {
      name: "이영민",
      position: ["프론트엔드", "팀장"],
      image: "",
      body: "",
    },
    {
      name: "강주희",
      position: ["프론트엔드"],
      image: "",
      body: "",
    },
    {
      name: "이은여울",
      position: ["프론트엔드"],
      image: "",
      body: "",
    },
    {
      name: "김신웅",
      position: ["백엔드", "데이터분석"],
      image: "",
      body: "",
    },
    {
      name: "노송희",
      position: ["백엔드"],
      image: "",
      body: "",
    },
    {
      name: "신도희",
      position: ["백엔드", "발표"],
      image: "",
      body: "",
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
    <Div>
      <div style={{ height: 50 }}></div>
      <div className="teamTitle"> 저희 6팀을 소개합니다.</div>
      <div className="teamCard">
        {data.map((item) => (
          <Card className="element">
            <Card.Body>
              <Card.Img
                variant="top"
                src={item.image}
                alt="프로필"
                className="cardImage"
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
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .teamTitle {
    margin: 30px 0;
    font-size: 2.5em;
    font-weight: bold;
  }
  .teamCard {
    height: 100vh;
    width: 90vw;
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
