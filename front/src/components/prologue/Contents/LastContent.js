import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Section,
    ContentRow,
    TextWrapper,
    Heading,
    Subtitle,
    ContentColumn,
} from './FirstLastStyle.js';
import { LoginButton } from '../../login/LoginButton.js';
import LastCarousel from "../Carousel/LastCarousel"
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const LastContent = ({ inverse }) => {
    const initial = { opacity: 0, y: 30 };
    const animation = useAnimation();

    const { ref, inView } = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inView) {
            animation.start({
                opacity: 1,
                y: 0,
            });
        }
    }, [inView, animation]);

    return (
        <Section ref={ref} inverse='false'>
            <Container>
                <ContentRow>
                    <ContentColumn>
                        <TextWrapper>
                            <Heading
                                initial={initial}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                animate={animation}
                                inverse='false'
                            >
                                Played Games Ratio
                            </Heading>
                            <Subtitle
                                initial={initial}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                animate={animation}
                                inverse='false'
                            >
                                <b>그 수많은 게임들은 정말 다 플레이 되고 있을까요?</b> <p />
                                전체 게임들 중에서 한 번이라도 사용자가 시도해 본 게임의 비율은 <b>단 22.8%</b>입니다.<br /><b>약 80%의 인디게임</b>은 단 한 줌의 빛도 볼 수 없습니다.<p />
                                우리는 <b>보다 많은 사람들</b>이 게임의 세계를 접하고 게임의 세계가 <b>보다 넓어지기</b>를 바랍니다.<br />
                                그래서 당신이 몰랐지만 당신이 너무나도 좋아할 <b>소울게임</b>을 찾아드립니다!
                            </Subtitle>
                            <Subtitle
                                initial={initial}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                animate={animation}
                                inverse='false'
                                style={{ fontSize: '2.2rem', marginTop: '3rem' }}
                            >
                                <b>Game Pearl</b>에서 당신의 <b>소울 게임</b>을 찾아보세요 :)<br />
                                <Link to="/recommend"><LoginButton style={{ marginTop: '3.3rem', height: '60px', fontSize: '1.7rem' }}>게임 추천</LoginButton></Link>
                            </Subtitle>
                        </TextWrapper>
                    </ContentColumn>
                    <LastCarousel />
                </ContentRow>
            </Container>
        </Section >)
}

export default LastContent