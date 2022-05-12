import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../PrologueStyle'
import { MainVideo, MainSection, MainText, ButtonWrapper, MainButton } from './ProlMainStyles';


const PrologueMain = () => {
    return (
        <MainSection>
            <MainVideo src="videos/game_geo.mp4" autoPlay muted loop />
            <Container>
                <MainHeading>Do you Love to Play Games?</MainHeading>
                <MainText>
                    게임을 단 한번이라도 즐긴 적이 있다면...
                </MainText>
                <ButtonWrapper>
                    <Link to="/register">
                        <MainButton>가입하기!</MainButton>
                    </Link>
                </ButtonWrapper>
            </Container>
        </MainSection>
    )

}

export default PrologueMain 