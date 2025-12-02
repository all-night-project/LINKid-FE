import styled from "styled-components";
import VideoIcon from "../../assets/icons/video.svg?react";
import GuideSection from "./GuideSection";

const VideoGuideSection = () => {
    return (
        <Wrapper>
            <GuideSection
                icon={<VideoIcon />}
                title="영상 가이드"
                subtitle="최적의 분석을 위한 영상 가이드"
            >
                <GuideWrapper>
                    <Circle>1</Circle>
                    <TextGroup>
                        <ItemTitle>자연스러운 놀이 상황</ItemTitle>
                        <ItemDesc>평소와 같은 자연스러운 놀이 환경에서 촬영해주세요</ItemDesc>
                    </TextGroup>
                </GuideWrapper>
                <GuideWrapper>
                    <Circle>2</Circle>
                    <TextGroup>
                        <ItemTitle>5-10분 길이</ItemTitle>
                        <ItemDesc>너무 짧거나 길지 않은 적절한 길이로 촬영해주세요</ItemDesc>
                    </TextGroup>
                </GuideWrapper>
                <GuideWrapper>
                    <Circle>3</Circle>
                    <TextGroup>
                        <ItemTitle>명확한 음성</ItemTitle>
                        <ItemDesc>대화가 명확하게 들릴 수 있도록 조용한 환경에서 촬영해주세요</ItemDesc>
                    </TextGroup>
                </GuideWrapper>
            </GuideSection>
        </Wrapper>
    );
};

export default VideoGuideSection;

const Wrapper = styled.div`
    margin-top: 20px;
`
const GuideWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 11px;
    margin-top: 20px;
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary[500]};
    color: white;
    font-size: 1.,4rem;
    font-weight: ${({ theme }) => theme.typography.weights.extrabold};
    flex-shrink: 0;
`;

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const ItemTitle = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const ItemDesc = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
`