import { useEffect, useState } from "react";
import styled from "styled-components";

interface AnalyzeInfoItem {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
}

interface Props {
    items: AnalyzeInfoItem[];
}

const AnalyzeInfoCarousel = ({ items }: Props) => {
    const [index, setIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const displayItems = [items[items.length - 1], ...items, items[0]];

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => prev + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // transition 끝났을 때 index restart
    useEffect(() => {
        if (index === displayItems.length - 1) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(1);
            }, 600);
        } else if (index === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(displayItems.length - 2);
            }, 600);
        } else {
            setIsTransitioning(true);
        }
    }, [index, displayItems.length]);

    return (
        <Wrapper>
            <CarouselInner $index={index} $transition={isTransitioning}>
                {displayItems.map((item, i) => (
                    <Card key={`${item.id}-${i}`}>
                        <IconWrapper>{item.icon}</IconWrapper>
                        <Title>{item.title}</Title>
                        <Desc>{item.description}</Desc>
                    </Card>
                ))}
            </CarouselInner>
        </Wrapper>
    );
};

export default AnalyzeInfoCarousel;

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 90%;
    height: 310px;
    max-width: 420px;
    margin-top: 60px;
`;

const CarouselInner = styled.div<{ $index: number; $transition: boolean }>`
    display: flex;
    align-items: center;
    transform: translateX(${({ $index }) => -$index * 100}%);
    transition: ${({ $transition }) =>
        $transition ? "transform 0.6s ease-in-out" : "none"};
    width: 100%;
    height: 100%;
`;

const Card = styled.div`
    width: 100%;
    height: 100%;
    flex: 0 0 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #F2F7F2;
    border: 2px solid #E5ECE5;
    border-radius: 16px;
    padding: 24px 20px;
    box-sizing: border-box;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const Title = styled.p`
    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    text-align: center;
    margin-top: 42px;
`;

const Desc = styled.p`
    width: calc(100% - 30px);
    font-size: 17px;
    line-height: 1.4;
    text-align: center;
    margin-top: 40px;
`;
