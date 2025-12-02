import styled, { css } from "styled-components";
import { useState } from "react";
import SectionCard from "../common/SectionCard";
import Button from "../common/Button";
import AccordionItem from "../common/AccordionItem";
import CompleteModal from "../common/CompleteModal";

import type { GrowthReport } from "../../types/report";

interface ReportStep5Props {
    growthReport: GrowthReport;
    showChallengeSection?: boolean;
}


const variantList = ["pink", "green", "navy"] as const;

const ReportStep5 = ({ growthReport, showChallengeSection = true }: ReportStep5Props) => {
    const { analysis_session, current_metrics, challenge_evaluations } = growthReport;

    const [openModal, setOpenModal] = useState(false);
    const [selectedActionId, setSelectedActionId] = useState<number | null>(null);

    const [completedActions, setCompletedActions] = useState<number[]>([]);
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

    const openModalFor = (actionId: number) => {
        console.log("🔥 openModalFor 호출됨, 받은 actionId:", actionId);
        setSelectedActionId(actionId);
        setOpenModal(true);
    };

    return (
        <Wrapper>
            <SectionCard title="나의 성장 리포트" alignment="left">
                {/* 핵심 지표 변화 */}
                <DiffTitle>직전 리포트 대비 변화 (부모)</DiffTitle>
                <IndicatorList>
                    {current_metrics.map((item, index) => {
                        const variant = variantList[index] ?? "pink";

                        // before/after/diff 안전 처리
                        const before = item.before ?? "-";
                        const after = item.after ?? "-";
                        const diff: number | null =
                            item.diff === null || item.diff === undefined
                                ? null
                                : item.diff;

                        // diff에 따라 텍스트 계산
                        const isPositive = diff !== null && diff > 0;

                        const diffText =
                            diff === null
                                ? "-"                          // diff 없으면 " - "
                                : isPositive
                                    ? `↑ +${diff}%p`               // 양수
                                    : diff === 0
                                        ? `- 0%p`                      // 0일 때
                                        : `↓ ${Math.abs(diff)}%p`;     // 음수일 때

                        return (
                            <IndicatorCard key={index} variant={variant}>
                                <IndicatorLeft variant={variant}>
                                    <IndicatorName variant={variant}>{item.label}</IndicatorName>
                                    <span>{before}% → {after}%</span>
                                </IndicatorLeft>

                                <Diff isPositive={isPositive} variant={variant}>
                                    {diffText}
                                </Diff>
                            </IndicatorCard>
                        );
                    })}
                </IndicatorList>
                <AiComment>{analysis_session.comment}</AiComment>
                {/* 챌린지 힌팅 */}
                {showChallengeSection && (
                    <ChallengeHintBox>
                        <ChallengeHintTitle>이번 상호작용 속 챌린지 평가</ChallengeHintTitle>
                        <ChallengeHintSub>AI가 감지한 작은 실천들을 확인해보세요.</ChallengeHintSub>

                        {challenge_evaluations && challenge_evaluations.length > 0 ? (
                            <>
                                <ChallengeList>
                                    {challenge_evaluations.map((evaluation, evalIndex) =>

                                        evaluation.actions.map((action) => {
                                            const isCompleted = completedActions.includes(action.action_id);
                                            const key = action.action_id;

                                            return (
                                                <Challenge key={key}>
                                                    <ChallengeWrapper>

                                                        {/* ---------- 카드 헤더 ---------- */}
                                                        <ChallengeTitle>
                                                            <ChallengeName>
                                                                ‘{evaluation.challenge_name}’ {action.detected_count}회
                                                            </ChallengeName>
                                                            <ChallengeDesc>{action.description}</ChallengeDesc>
                                                        </ChallengeTitle>

                                                        {/* 완료 여부 */}
                                                        {isCompleted ? (
                                                            <CompletedBadge>완료됨</CompletedBadge>
                                                        ) : (
                                                            <Button
                                                                variant="primary"
                                                                onClick={() => openModalFor(action.action_id)}
                                                            >
                                                                완료하기
                                                            </Button>
                                                        )}
                                                    </ChallengeWrapper>

                                                    {/* ---------- 아코디언 ---------- */}
                                                    <AccordionItem
                                                        question="어디에서 이 행동이 나타났나요?"
                                                        variant="pattern"
                                                        isOpen={openAccordionIndex === key}
                                                        onToggle={() =>
                                                            setOpenAccordionIndex(prev =>
                                                                prev === key ? null : key
                                                            )
                                                        }
                                                    >
                                                        <Content>
                                                            {action.instances.map((instance, idx) => (
                                                                <Row key={idx}>
                                                                    <Time>{instance.timestamp}</Time>
                                                                    <Summary>{instance.summary}</Summary>
                                                                </Row>
                                                            ))}
                                                        </Content>
                                                    </AccordionItem>

                                                </Challenge>
                                            );
                                        })

                                    )}
                                </ChallengeList>

                                {/* 완료 모달 */}
                                <CompleteModal
                                    open={openModal}
                                    actionId={selectedActionId ?? 0}
                                    onClose={() => setOpenModal(false)}
                                    onCompleted={(id) => {
                                        setCompletedActions(prev => [...prev, id]);
                                        setOpenModal(false);
                                    }}
                                />

                            </>
                        ) : (
                            <EmptyMsg>
                                {`이번 상호작용에서는 챌린지 행동이 감지되지 않았어요.\n성공은 오늘이 아니어도 됩니다. 다음 상호작용에서 다시 도전해보세요!`}
                            </EmptyMsg>
                        )}
                    </ChallengeHintBox>
                )}
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
    gap: 10px;

    > Button {
        height: 25px;
        font-size: 1.3rem;
        box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
    }
`

const ChallengeTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 270px;   
    flex-shrink: 0; 
`

const ChallengeName = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const ChallengeDesc = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.3;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 10px;
`;

const Time = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    width: 60px;
    line-height: 1.3;
    min-width: 50px;
`;

const Summary = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    line-height: 1.4;
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

const CompletedBadge = styled.div`
    min-width: 60px;
    padding: 6px 10px;
    background: #E6F6E9;
    color: ${({ theme }) => theme.colors.secondary[600]};
    border-radius: 8px;
    height: 25px;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;