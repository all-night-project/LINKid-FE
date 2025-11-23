import styled from "styled-components";
import { useState } from "react";
import SectionCard from "../common/SectionCard";
import AccordionItem from "../common/AccordionItem";
import StarIcon from "../../assets/icons/star.svg?react";
import BulbIcon from "../../assets/icons/bulb.svg?react";

interface KeyMomentsProps {
    keyMoments: {
        bestMoment: {
            diagnosis: string;
            conversation: string[];
            aiComment: string;
            reference: string;
        };
        growthOpportunity: {
            diagnosis: string;
            conversation: string[];
            aiComment: string;
            suggestion: string;
            reference: string;
        };
        detailedPatterns: {
            patternName: string;
            count: number;
            startTime: string;
            childLine: string;
            parentLine: string;
            why: string;
            recommended: string;
        };
    };
}

const ReportStep2 = ({ keyMoments }: KeyMomentsProps) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    const { bestMoment, growthOpportunity, detailedPatterns } = keyMoments;

    return (
        <Wrapper>
            <SectionCard
                title="AI가 포착한 핵심 순간"
                alignment="left"
            >
                <Moment>
                    <Header>
                        <BestIcon><StarIcon /></BestIcon>
                        <HeaderRight>
                            <Title>이번 대화의 'Best' 순간</Title>
                            <BestDesc>{bestMoment.diagnosis} 패턴 발견</BestDesc>
                        </HeaderRight>
                    </Header>

                    <ChatBubble>
                        {bestMoment.conversation.map((line, idx) => (
                            <Chat key={idx}>{line}</Chat>
                        ))}
                    </ChatBubble>

                    <AIComment>{bestMoment.aiComment}</AIComment>
                    <Reference>참고: {bestMoment.reference}</Reference>
                </Moment>

                <Moment>
                    <Header>
                        <GrowthIcon><BulbIcon /></GrowthIcon>
                        <HeaderRight>
                            <Title>이번 대화의 '성장 기회'</Title>
                            <GrowthDesc>{growthOpportunity.diagnosis} 패턴 발견</GrowthDesc>
                        </HeaderRight>
                    </Header>

                    <ChatBubble>
                        {growthOpportunity.conversation.map((line, idx) => (
                            <Chat key={idx}>{line}</Chat>
                        ))}
                    </ChatBubble>

                    <AIComment>{growthOpportunity.aiComment}</AIComment>

                    <Suggestion>{`대안 예시:\n${growthOpportunity.suggestion}`}</Suggestion>
                    <Reference>참고: {growthOpportunity.reference}</Reference>
                </Moment>

                {/* 아코디언 — 패턴 상세 분석 */}
                <AccordionItem
                    variant="pattern"
                    question="안티 패턴 더보기"
                    isOpen={open}
                    onToggle={toggle}
                >
                    <PatternContainer>
                        <PatternTitle>
                            “{detailedPatterns.patternName}” ({detailedPatterns.count}회)
                        </PatternTitle>

                        <SmallText>발생 시점: {detailedPatterns.startTime}</SmallText>

                        <ChatBubble>
                            <ChatRow>
                                <Role>아이:</Role>
                                <Chat>{detailedPatterns.childLine}</Chat>
                            </ChatRow>
                            <ChatRow>
                                <Role>부모:</Role>
                                <Chat>{detailedPatterns.parentLine}</Chat>
                            </ChatRow>
                        </ChatBubble>

                        <DetailLabel>💡 왜 문제인가요?</DetailLabel>
                        <AIComment>{detailedPatterns.why}</AIComment>

                        <DetailLabel>✅ 권장 대응:</DetailLabel>
                        <AIComment>{detailedPatterns.recommended}</AIComment>
                    </PatternContainer>
                </AccordionItem>
            </SectionCard>
        </Wrapper >
    );
};

export default ReportStep2;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > SectionCard {
        padding: 24px 22px;
    }
`;

const Moment = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 11px;
`;

const Header = styled.div`
    display: flex;
    gap: 7px;
`;

const Title = styled.h2`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const BestIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #FFFCDE;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GrowthIcon = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #FFF3E0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const BestDesc = styled.p`
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: #312E81;
`;

const GrowthDesc = styled.p`
    font-size: 1.1rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: #FF9800;
`;

const ChatBubble = styled.div`
    background: ${({ theme }) => theme.colors.gray[200]};
    border-radius: 12px;
    padding: 14px 19px;
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ChatRow = styled.div`
    display: flex;
    gap: 20px;
`;

const Role = styled.span`
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: 1.3rem;
`;

const Chat = styled.span`
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 1.3rem;  
`;

const AIComment = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

const Reference = styled.p`
    font-size: 1.1rem;
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const PatternContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PatternTitle = styled.h4`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const SmallText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

const DetailLabel = styled.p`
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: 1.3rem;
`;

const Suggestion = styled.p`
    padding: 13px 19px;
    background: ${({ theme }) => theme.colors.secondary[200]};
    border-radius: 10px;
    color: #28A745;
    white-space: pre-line;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    line-height: 1.8;
    margin-top: 8px;
`