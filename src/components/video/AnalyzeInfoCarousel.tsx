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
    const [extendedItems, setExtendedItems] = useState<AnalyzeInfoItem[]>([]);

    useEffect(() => {
        if (items.length > 0) {
            setExtendedItems([...items, items[0]]);
        }
    }, [items]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimate, setIsAnimate] = useState(true);

    // 2. 자동 슬라이드 로직
    useEffect(() => {
        const interval = setInterval(() => {
            // 다음 슬라이드로 이동할 때는 무조건 애니메이션 켜기
            setIsAnimate(true);
            setCurrentIndex((prev) => prev + 1);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    // 3. 애니메이션이 끝난 후 처리 (무한 루프의 핵심)
    const handleTransitionEnd = () => {
        // 만약 현재 보고 있는 게 '마지막에 추가한 복사본(1번)'이라면?
        if (currentIndex === extendedItems.length - 1) {
            // 1. 애니메이션을 끈다 (눈치 못 채게)
            setIsAnimate(false);
            // 2. 진짜 0번 인덱스(1번 아이템)로 순간이동
            setCurrentIndex(0);
        }
    };

    if (items.length === 0) return null;

    return (
        <Wrapper>
            <CarouselInner
                $index={currentIndex}
                $animate={isAnimate}
                onTransitionEnd={handleTransitionEnd}
            >
                {extendedItems.map((item, i) => (
                    <CardWrapper key={`carousel-item-${i}`}>
                        <Card>
                            <IconWrapper>{item.icon}</IconWrapper>
                            <TextContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.description}</Desc>
                            </TextContainer>
                        </Card>
                    </CardWrapper>
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
    margin-top: 30px;
`;

const CarouselInner = styled.div<{ $index: number; $animate: boolean }>`
    display: flex;
    width: 100%;
    height: 100%;
    transform: translateX(${({ $index }) => -$index * 100}%);
    transition: ${({ $animate }) => ($animate ? "transform 0.6s ease-in-out" : "none")};
`;

const CardWrapper = styled.div`
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
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
    box-sizing: border-box;
    padding: 0 20px;
    box-sizing: border-box;
`;

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    margin-bottom: 40px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Title = styled.p`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold || 600};
    text-align: center;
    margin-bottom: 20px; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
`;

const Desc = styled.p`
    width: 100%;
    font-size: 1.5rem;
    line-height: 1.5; /* 줄간격 명시 */
    text-align: center;
    height: 4.5em;
    word-break: keep-all;
    overflow-wrap: break-word;
`;
