import styled from "styled-components"

export const BodyStyle = styled.div`
width: 100vw;
height: 100vh;
font-family: "Roboto", sans-serif;
background-color: #f8fafb;
`


export const QnaBox = styled.section`
position: relative;
left: 50%;
top: 50%;
width: 1000px;
text-align: center;
transform: translate(-50%, -50%);


.LeftButton {
    position: absolute;
    z-index: 1;
    left: 3rem;
    top: 7rem;
}

.RightButton {
    position: absolute;
    z-index: 1;
    right: 3rem;
    top: 7rem;
}

`

export const AnswerButton = styled.button`
margin: 10px;
outline: 0;
font-size: 16px;
border-radius:25px;
border:2px solid #6c63ff;
display:inline-block;
cursor: pointer;
color:#6c63ff;
font-family:Arial;
font-size:14px;
padding:10px 40px;
text-decoration:none;

opacity: 0.5;
${({ clicked }) => clicked && `opacity: 1; background-color: black`};




&:hover {
color: white;
    background-color:#bab1ba;

    &:active {
        position:relative;
        top:1px;
    }
}
`

export const Status = styled.div`
border: 2px solid #FFF;
height: 30px;
width: 80%;
background-color: #FFF;
border-radius: 20px;
`

export const StatusBar = styled.div`
height: 100%;
background-image: linear-gradient(to right, #ef32d9, #89fffd);
border-radius: 20px;
transition: all ease-in-out 1s 0s;
`
