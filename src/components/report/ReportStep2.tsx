import styled from "styled-components";
import { useState } from "react";
import SectionCard from "../common/SectionCard";
import AccordionItem from "../common/AccordionItem";
import StarIcon from "../../assets/icons/star.svg?react";
import BulbIcon from "../../assets/icons/bulb.svg?react";

import type { KeyMomentsProps } from "../../types/report";


const ReportStep2 = ({ keyMoments }: KeyMomentsProps) => {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);
    const { positive, needs_improvement, pattern_examples } = keyMoments;

    const hasPositive = positive && positive.length > 0;

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
                            <BestDesc>
                                {hasPositive
                                    ? `${positive[0].pattern_hint} 패턴 발견`
                                    : "아직 발견된 패턴이 없어요"}
                            </BestDesc>
                        </HeaderRight>
                    </Header>

                    {hasPositive ? (
                        <>
                            <ChatBubble>
                                {positive[0].dialogue.map((line, idx) => (
                                    <Chat key={idx}>
                                        <Speaker>{line.speaker === "parent" ? "부모" : "아이"}</Speaker>
                                        <Text>{line.text}</Text>
                                    </Chat>
                                ))}
                            </ChatBubble>

                            <AIComment>{positive[0].reason}</AIComment>
                            <Reference>
                                <ReferenceLabel>참고 :</ReferenceLabel>
                                <ReferenceLow>
                                    {positive[0].reference_descriptions.map((desc, idx) => (
                                        <ReferenceText key={idx}>{desc}</ReferenceText>
                                    ))}
                                </ReferenceLow>
                            </Reference>
                        </>
                    ) : (
                        <EmptyStateBox>
                            <p>이번 대화에서는 특별한 긍정적 순간이 포착되진 않았어요.</p>
                            <p className="sub">
                                하지만 괜찮아요. 아이와 함께한 시간은 그 자체로 의미가 있고,
                                지금이 오히려 긍정적 상호작용을 쌓아갈 좋은 출발점이 될 수 있습니다.<br />
                                다음 대화에서 아이의 감정이나 작은 성취를 한 번 읽어주기만 해도<br />
                                멋진 ‘Best 순간’이 자연스럽게 만들어질 거예요. 🌿
                            </p>
                        </EmptyStateBox>
                    )}
                </Moment>

                <Moment>
                    <Header>
                        <GrowthIcon><BulbIcon /></GrowthIcon>
                        <HeaderRight>
                            <Title>이번 대화의 '성장 기회'</Title>
                            <GrowthDesc>{needs_improvement[0].pattern_hint} 패턴 발견</GrowthDesc>
                        </HeaderRight>
                    </Header>

                    <ChatBubble>
                        {needs_improvement[0].dialogue.map((line, idx) => (
                            <Chat>
                                <Speaker>{line.speaker === "parent" ? "부모" : "아이"}</Speaker>
                                <Text>{line.text}</Text>
                            </Chat>
                        ))}
                    </ChatBubble>

                    <AIComment>{needs_improvement[0].reason}</AIComment>

                    <Suggestion>{`대안 예시:\n${needs_improvement[0].better_response}`}</Suggestion>
                    <Reference>
                        <ReferenceLabel>참고 :</ReferenceLabel>
                        <ReferenceLow>
                            {needs_improvement[0].reference_descriptions.map((desc, idx) => (
                                <ReferenceText key={idx}>{desc}</ReferenceText>
                            ))}
                        </ReferenceLow>
                    </Reference>
                </Moment>

                {/* 아코디언 — 패턴 상세 분석 */}
                {pattern_examples.length === 0 ? (
                    <></>
                ) : (
                    <AccordionItem
                        variant="pattern"
                        question="안티 패턴 더보기"
                        isOpen={open}
                        onToggle={toggle}
                    >
                        <PatternContainer>
                            <PatternTitle>
                                “{pattern_examples[0].pattern_name}” ({pattern_examples[0].occurrences}회)
                            </PatternTitle>

                            <SmallText>발생 시점: {pattern_examples[0].occurrences}</SmallText>

                            <ChatBubble>
                                {pattern_examples[0].dialogue.map((line, idx) => (
                                    <Chat>
                                        <Speaker>{line.speaker === "parent" ? "부모" : "아이"}</Speaker>
                                        <Text>{line.text}</Text>
                                    </Chat>
                                ))}
                            </ChatBubble>

                            <DetailLabel>💡 왜 문제인가요?</DetailLabel>
                            <AIComment>{pattern_examples[0].problem_explanation}</AIComment>

                            <DetailLabel>✅ 권장 대응:</DetailLabel>
                            <AIComment>{pattern_examples[0].suggested_response}</AIComment>
                        </PatternContainer>
                    </AccordionItem>
                )}
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
    gap: 3px;
`;

const Header = styled.div`
    display: flex;
    gap: 8px;
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

const EmptyStateBox = styled.div`
    background:${({ theme }) => theme.colors.gray[200]};
    border-radius: 12px;
    padding: 30px 20px;
    margin: 8px 0;
    text-align: center;
    
    p {
        font-size: 1.4rem;
        font-weight: ${({ theme }) => theme.typography.weights.medium};
        line-height: 1.4;
        margin-bottom: 5px;
    }

    .sub {
        font-size: 1.2rem;
        font-weight: ${({ theme }) => theme.typography.weights.regular};
        color: ${({ theme }) => theme.colors.textSecondary};
    }
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

// Chat
const ChatBubble = styled.div`
    background: ${({ theme }) => theme.colors.gray[200]};
    border-radius: 12px;
    padding: 14px 19px;
    margin: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Chat = styled.div`
    display: flex;
`;

const Speaker = styled.span`
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 1.3rem;
    min-width: 35px;
    line-height: 1.4;
`;

const Text = styled.span`
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 1.3rem;
    line-height: 1.4;
`;

const AIComment = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.3;
    padding: 0 5px;
`;

const Reference = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 8px;
`;

const ReferenceLabel = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    min-width: 25px;
    line-height: 1.3;
`;

const ReferenceLow = styled.div`
    display: flex;
    flex-direction: column;
`;

const ReferenceText = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.3;
`

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
    line-height: 1.5;
    margin-top: 8px;
`