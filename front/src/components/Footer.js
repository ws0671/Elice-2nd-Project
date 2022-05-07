import logo from "../images/footerLogo.png";

const Footer = () => {
  return (
    <div
      id="whole-content"
      style={{
        minHeight: "20vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        // background:
        //   "linear-gradient(180deg, rgba(198, 35, 104, 0.91) 25.92%, rgba(196, 196, 196, 0) 100%)",
      }}
    >
      <img src={logo} alt="logo" width="100px" />
      <footer
        style={{
          width: "100%",
          position: "relative",
          bottom: 0,
          padding: "20px 0",
        }}
      >
        <div style={{ textAlign: "center", opacity: 0.8 }}>
          Copyright © 2022 Game Pearl. All rights reserved.
        </div>
        <div style={{ textAlign: "center", opacity: 0.8 }}>
          엘리스 AI 4기 6팀 연결고리
        </div>
      </footer>
    </div>
  );
};

export default Footer;
