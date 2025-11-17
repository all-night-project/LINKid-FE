import styled from "styled-components";
import { useState } from "react";
import SectionCard from "../common/SectionCard";
import AccordionItem from "../common/AccordionItem";
import Button from "../common/Button";
import FlagIcon from "../../assets/icons/flag.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";
import CheckIcon from "../../assets/icons/check.svg?react";

interface CoachingProps {
    coaching: {
        summary: string;
        generatedChallenge: {
            challengeId: number;
            title: string;
            goal: string;
            period: string;
            preview: [];
        };
    };
}

const ReportStep4 = ({ coaching }: CoachingProps) => {
    const { summary, generatedChallenge } = coaching;
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen((prev) => !prev);

    return (
        <Wrapper>

            {/* ---------------------- 1) AI 종합 해석 ---------------------- */}
            <SectionCard title="AI 종합 코칭 및 실천 계획" alignment="left">

                <AnalysisBox>
                    <AnalysisTitle>AI 종합 해석</AnalysisTitle>
                    <AnalysisText>{summary}</AnalysisText>
                </AnalysisBox>

                <ChallengeBox>
                    <ChallengeTitle>이번주 챌린지</ChallengeTitle>
                    <ChallengeText>{generatedChallenge.title}</ChallengeText>

                    <ChallengeCard>
                        <SubTitleRow>
                            <FlagIcon />
                            <span>목표</span>
                        </SubTitleRow>
                        <SubText>{generatedChallenge.goal}</SubText>
                    </ChallengeCard>

                    <ChallengeCard>
                        <SubTitleRow>
                            <ClockIcon />
                            <span>기간</span>
                        </SubTitleRow>
                        <SubText>{generatedChallenge.period}</SubText>
                    </ChallengeCard>

                    <AccordionItem
                        variant="transparent"
                        question="챌린지 행동 미리보기"
                        isOpen={open}
                        onToggle={toggle}
                    >
                        <ol>
                            {generatedChallenge.preview.map((desc, idx) => (
                                <li key={idx}>{desc}</li>
                            ))}
                        </ol>
                    </AccordionItem>
                    <AcceptButton
                        variant="primary"
                        icon={<CheckIcon />}
                    >
                        챌린지 수락하기
                    </AcceptButton>
                </ChallengeBox>

                <TipBox>
                    <TipTitle>챌린지 공략집</TipTitle>
                    <TipCard>
                        <Question>
                            Q. ‘긍정적 기회’는 언제 발생하나요?
                        </Question>
                        <Answer>
                            A. 아이가 자신의 행동을 공유하거나 친사회적 행동을 할 때(예: “동생 도와줬어”) 발생합니다.
                        </Answer>
                    </TipCard>
                    <TipCard>
                        <Question>
                            Q. 어떻게 반응해야 하나요?
                        </Question>
                        <Answer>
                            A. 반영적 듣기(예: “그렇구나 그렇구나”) 또는 구체적 칭찬(예: “동생 챙겨줘서 멋지다”)으로 즉시 반응해 주세요.
                        </Answer>
                    </TipCard>
                </TipBox>
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
    gap: 5px;
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
    line-height: 1.3;
`;

const ChallengeBox = styled.div`
    width: 100%;
    background: ${({ theme }) => theme.colors.primary[400]};
    display: flex;
    flex-direction: column;
    padding: 13px 18px;
    border-radius: 10px;
    margin-top: 10px;
    gap: 5px;
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
    gap: 2px;
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
`

const TipBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    gap: 8px;
`;

const TipTitle = styled.h3`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`

const TipCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 2px solid #f6f6f6;
    padding: 17px 18px;
    gap: 7px;
`;

const Question = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const Answer = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.3;
`;