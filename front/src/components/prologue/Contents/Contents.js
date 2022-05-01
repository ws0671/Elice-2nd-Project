import React, { useEffect } from 'react';
import { Container, Section } from '../PrologueStyle';
import {
    ContentRow,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    ImgWrapper,
    Img,
    ContentColumn,
} from './ContentStyle.js';

import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

export const Content = ({
    primary,
    topLine,
    headline,
    description,
    description2,
    description3,
    description4,
    description5,
    img,
    alt,
    inverse,
    reverse,
}) => {
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
        <Section inverse={inverse} ref={ref}>
            <Container>
                <ContentRow reverse={reverse}>
                    <ContentColumn>
                        <TextWrapper>
                            <TopLine
                                initial={initial}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                animate={animation}
                            >
                                {topLine.text}
                            </TopLine>
                            <Heading
                                initial={initial}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                animate={animation}
                                inverse={inverse}
                            >
                                {headline}
                            </Heading>
                            <Subtitle
                                initial={initial}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                animate={animation}
                                inverse={inverse}
                            >
                                <description>{description}<p />{description2}<br />{description3}<p />{description4}<br />{description5}</description>
                            </Subtitle>
                        </TextWrapper>
                    </ContentColumn>
                    <ContentColumn
                        initial={initial}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        animate={animation}
                    >
                        <ImgWrapper>
                            <Img
                                src={img}
                                alt={alt}
                                whileHover={{ rotate: 2, scale: 1.12 }}
                                transition={{ duration: 0.5 }}
                            />
                        </ImgWrapper>
                    </ContentColumn>
                </ContentRow>
            </Container>
        </Section>
    );
};