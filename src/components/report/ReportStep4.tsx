import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SectionCard from "../common/SectionCard";
import AccordionItem from "../common/AccordionItem";
import Button from "../common/Button";
import FlagIcon from "../../assets/icons/flag.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";

import type { CoachingPlanType } from "../../types/report";
import { createChallenge } from "../../api/challenge";

// 최종 Props 타입
interface ReportStep4Props {
    coaching: CoachingPlanType;
    challengeStatus: string;
    onSuccess?: () => void;
}

const ReportStep4 = ({ coaching, challengeStatus, onSuccess }: ReportStep4Props) => {
    const [open, setOpen] = useState(false);
    const [justAccepted, setJustAccepted] = useState(false);

    const toggle = () => setOpen((prev) => !prev);
    const { reportId } = useParams();

    if (!coaching) {
        return <div>코칭 데이터를 불러오는 중...</div>;
    }

    const start = coaching.challenge.suggested_period.start;
    const end = coaching.challenge.suggested_period.end;

    console.log("Received Challenge Status:", challengeStatus);

    const normalizedStatus = challengeStatus
        ? String(challengeStatus).toUpperCase()
        : "NOT_CREATED";

    const currentStatus = justAccepted ? "PROCEEDING" : normalizedStatus;

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "PROCEEDING":
                return {
                    text: "챌린지가 수락되었습니다!",
                    isDisabled: true,
                    textColor: "#5A4A42"
                };
            case "FAILED":
                return {
                    text: "챌린지를 실패하였습니다",
                    isDisabled: true,
                    textColor: "#5A4A42"
                };
            case "COMPLETED":
                return {
                    text: "챌린지를 성공했습니다!",
                    isDisabled: true,
                    textColor: "#5A4A42"
                };
            case "NOT_CREATED":
            default:
                return {
                    text: "챌린지 수락하기",
                    isDisabled: false,
                };
        }
    };

    const statusConfig = getStatusConfig(currentStatus);

    const handleAccept = async () => {
        try {
            await createChallenge(Number(reportId));
            setJustAccepted(true);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error("챌린지 생성 오류:", err);
        }
    };

    return (
        <Wrapper>

            {/* ---------------------- 1) AI 종합 해석 ---------------------- */}
            <SectionCard title="AI 종합 코칭 및 실천 계획" alignment="left">

                <AnalysisBox>
                    <AnalysisTitle>AI 종합 해석</AnalysisTitle>
                    <AnalysisText>{coaching.summary}</AnalysisText>
                </AnalysisBox>

                <ChallengeBox>
                    <ChallengeTitle>이번주 챌린지</ChallengeTitle>
                    <ChallengeText>{coaching.challenge.title}</ChallengeText>

                    <ChallengeCard>
                        <SubTitleRow>
                            <FlagIcon />
                            <span>목표</span>
                        </SubTitleRow>
                        <SubText>{coaching.challenge.goal}</SubText>
                    </ChallengeCard>

                    <ChallengeCard>
                        <SubTitleRow>
                            <ClockIcon />
                            <span>기간</span>
                        </SubTitleRow>
                        <SubText>
                            {coaching.challenge.period_days}일간 ({start} ~ {end})</SubText>
                    </ChallengeCard>

                    <AccordionItem
                        variant="transparent"
                        question="챌린지 행동 미리보기"
                        isOpen={open}
                        onToggle={toggle}
                    >
                        <ol>
                            {coaching.challenge.actions.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                        </ol>
                    </AccordionItem>
                    <AcceptButton
                        // 비활성화 상태면 disabled 스타일(회색 배경 등), 아니면 primary
                        variant={statusConfig.isDisabled ? "disabled" : "primary"}
                        icon={<CheckIcon />}
                        onClick={statusConfig.isDisabled ? undefined : handleAccept}
                        disabled={statusConfig.isDisabled}
                    >
                        {/* 상태에 따른 텍스트 색상 및 문구 적용 */}
                        <span style={{ color: statusConfig.textColor }}>
                            {statusConfig.text}
                        </span>
                    </AcceptButton>
                </ChallengeBox>

                <ReasonBox>
                    <ReasonTitle>이번 챌린지가 제안된 이유</ReasonTitle>
                    <ReasonText>{coaching.challenge.rationale}</ReasonText>
                </ReasonBox>
            </SectionCard>
        </Wrapper>
    );
};

export default ReportStep4;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > SectionCard {
        padding: 24px 22px;
    }
`;

const AnalysisBox = styled.div`
    width: 100%;
    background: #F2F2F9;
    display: flex;
    flex-direction: column;
    padding: 13px 18px;
    border-radius: 10px;
    gap: 8px;
    margin-top: 5px;
`;

const AnalysisTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.navy};
`;

const AnalysisText = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.navy};
    line-height: 1.4;
`;

const ChallengeBox = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.primary[400]};
    display: flex;
    flex-direction: column;
    padding: 13px 18px;
    border-radius: 10px;
    margin-top: 10px;
    gap: 8px;
`;

const ChallengeTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.primary[600]};
`;

const ChallengeText = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.primary[600]};
`;

const ChallengeCard = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: white;
    border: 0.7px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 5px;
    padding: 7px;
    gap: 5px;
`;

const SubTitleRow = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    
    span {
        font-size: 1.3rem;
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
        color: ${({ theme }) => theme.colors.textPrimary};
    }

    svg {
        width: 17px;
        height: 17px;
    }
`;

const SubText = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    margin-left: 2px;
    line-height: 1.3;
`;

const AcceptButton = styled(Button)`
    height: 40px;
    border-radius: 5px;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: white;
    gap: 1px;
    
    svg {
        stroke: white;
    }

    &:disabled {
        cursor: default; 
    }
`

const ReasonBox = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.secondary[800]};
    display: flex;
    flex-direction: column;
    padding: 13px 18px;
    border-radius: 10px;
    gap: 5px;
    margin-top: 5px;
`;

const ReasonTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const ReasonText = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.4;
`;