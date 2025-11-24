import styled, { css } from "styled-components";
import { useState } from "react";
import SectionCard from "../common/SectionCard";
import Button from "../common/Button";
import AccordionItem from "../common/AccordionItem";
import CompleteModal from "../common/CompleteModal";

interface GrowthReportProps {
    growthReport: {
        currentMetrics: {
            label: string;
            before: number;
            after: number;
            diff: number;
        }[];
        comment: string;
        challengeEvaluation: {
            challengeName: string;
            detectedCount: number;
            description: string;
            instances: {
                timestamp: string;
                summary: string;
            }[];
        }[];
    };
}

const variantList = ["pink", "green", "navy"] as const;

const ReportStep5 = ({ growthReport }: GrowthReportProps) => {
    const [isOpenInstances, setIsOpenInstances] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

    return (
        <Wrapper>
            <SectionCard title="나의 성장 리포트" alignment="left">
                {/* 핵심 지표 변화 */}
                <DiffTitle>핵심 지표 변화 (지난 회차 기준)</DiffTitle>
                <IndicatorList>
                    {growthReport.currentMetrics.map((item, index) => (
                        <IndicatorCard key={index} variant={variantList[index] ?? "pink"}>
                            <IndicatorLeft variant={variantList[index] ?? "pink"}>
                                <IndicatorName variant={variantList[index] ?? "pink"}>{item.label}</IndicatorName>
                                <span>{item.before}% → {item.after}%</span>
                            </IndicatorLeft>
                            <Diff isPositive={item.diff > 0} variant={variantList[index] ?? "pink"}>
                                {item.diff > 0 ? `↑ +${item.diff}%p` : `↓ ${item.diff}%p`}
                            </Diff>
                        </IndicatorCard>
                    ))}
                </IndicatorList>
                <AiComment>{growthReport.comment}</AiComment>
                {/* 챌린지 힌팅 */}
                <ChallengeHintBox>
                    <ChallengeHintTitle>이번 상호작용 속 챌린지 평가</ChallengeHintTitle>
                    <ChallengeHintSub>AI가 감지한 작은 실천들을 확인해보세요.</ChallengeHintSub>

                    {growthReport.challengeEvaluation.length > 0 ? (
                        <ChallengeList>
                            {growthReport.challengeEvaluation.map((item, index) => {
                                return (
                                    <Challenge key={index}>
                                        <ChallengeWrapper>
                                            <ChallengeTitle>
                                                <ChallengeName>
                                                    '{item.challengeName}' {item.detectedCount}회
                                                </ChallengeName>
                                                <ChallengeDesc>{item.description}</ChallengeDesc>
                                            </ChallengeTitle>
                                            <Button
                                                variant="primary"
                                                onClick={() => {
                                                    setSelectedChallenge(item.challengeName);
                                                    setOpenModal(true);
                                                }}
                                            >완료하기</Button>
                                            <CompleteModal
                                                open={openModal}
                                                onClose={() => setOpenModal(false)}
                                                onSubmit={(data) => {
                                                    console.log("기록된 날짜/회고", data);
                                                    console.log("대상 챌린지:", selectedChallenge);
                                                    setOpenModal(false);
                                                }}
                                            />
                                        </ChallengeWrapper>
                                        <AccordionItem
                                            question="어디에서 이 행동이 나타났나요?"
                                            variant="pattern"
                                            isOpen={isOpenInstances}
                                            onToggle={() => setIsOpenInstances((prev) => !prev)}
                                        >
                                            <Content>
                                                {item.instances.map((instance, idx) => (
                                                    <Row key={idx}>
                                                        <Time>{instance.timestamp}초</Time>
                                                        <Summary>{instance.summary}</Summary>
                                                    </Row>
                                                ))}
                                            </Content>
                                        </AccordionItem>
                                    </Challenge>
                                );
                            })}
                        </ChallengeList>
                    ) : (
                        <EmptyMsg>
                            {`이번 상호작용에서는 챌린지 행동이 감지되지 않았어요.\n성공은 오늘이 아니어도 됩니다. 다음 상호작용에서 다시 도전해보세요!`}
                        </EmptyMsg>
                    )}
                </ChallengeHintBox>
            </SectionCard>
        </Wrapper >
    );
};

export default ReportStep5;

const variantStyles = {
    pink: {
        IndicatorCard: css`
            background: ${({ theme }) => theme.colors.primary[400]};
        `,
        font: css`
            color: ${({ theme }) => theme.colors.primary[600]};
        `,
    },
    green: {
        IndicatorCard: css`
            background: ${({ theme }) => theme.colors.secondary[200]};
        `,
        font: css`
            color: ${({ theme }) => theme.colors.secondary[600]};
        `,
    },
    navy: {
        IndicatorCard: css`
            background: #F2F2F9;
        `,
        font: css`
            color: ${({ theme }) => theme.colors.navy};
        `,
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const DiffTitle = styled.div`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-top: 10px;
`;

const IndicatorList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const IndicatorCard = styled.div < { variant: "pink" | "green" | "navy" } >`
    ${({ variant }) => variantStyles[variant].IndicatorCard};
    padding: 11px 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IndicatorLeft = styled.div< { variant: "pink" | "green" | "navy" } >`
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
        ${({ variant }) => variantStyles[variant].font};
        font-size: 1.3rem;
        font-weight: ${({ theme }) => theme.typography.weights.regular};
    }
`;

const IndicatorName = styled.div< { variant: "pink" | "green" | "navy" } >`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    ${({ variant }) => variantStyles[variant].font};
`;

const Diff = styled.div<{ isPositive: boolean; variant: "pink" | "green" | "navy" }>`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    ${({ variant }) => variantStyles[variant].font};
`;

const AiComment = styled.div`
    width: 100%;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.4;
    padding: 13px 15px;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.gray[200]};
`;

const ChallengeHintBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const ChallengeHintTitle = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const ChallengeHintSub = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    margin-top: 7px;
`;

const ChallengeList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 14px;
`;

const Challenge = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ChallengeWrapper = styled.div`
    background: ${({ theme }) => theme.colors.gray[200]};
    border: 1.5px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: 10px;
    padding: 13px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > Button {
        width: 58px;
        height: 25px;
        font-size: 1.3rem;
        box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
    }
`

const ChallengeTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const ChallengeName = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const ChallengeDesc = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Time = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 60px;
    line-height: 1.3;
`;

const Summary = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    line-height: 1.3;
`;

const EmptyMsg = styled.div`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.4;

    padding: 13px 15px;
    border-radius: 10px;
    background: #FFFCDE;
    margin-top: 10px;

    white-space: pre-line;
`;