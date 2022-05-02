import React, { useEffect } from 'react';
import {
    Container,
    Section,
    ContentRow,
    TextWrapper,
    Heading,
    Subtitle,
    ContentColumn,
} from './FirstLastStyle.js';
import FirstCarousel from "../Carousel/FirstCarousel"
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const FirstContent = () => {
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
        <Section ref={ref}>
            <Container>
                <ContentRow>
                    <ContentColumn>
                        <TextWrapper>
                            <Heading
                                initial={initial}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                animate={animation}
                            >
                                Do you Love to Play Games?
                            </Heading>
                            <Subtitle
                                initial={initial}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                animate={animation}
                            >
                                한 때, 게임은 아이들이 폭력적으로 변하는 원인이라는 부정적인 인식이 있었습니다.<br />
                                더불어 남자 또는 어린 아이의 철 없는 행동으로 일컬어졌습니다.<p />
                                하지만 오늘날, 게임은 남녀노소 모든 계층을 아우르는 취미가 되고 있습니다.
                            </Subtitle>
                        </TextWrapper>

                    </ContentColumn>
                    <FirstCarousel />
                </ContentRow>
            </Container>
        </Section>)
}

export default FirstContent