import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TrophyIcon from "../../assets/icons/trophy.svg?react";
import BulbIcon from "../../assets/icons/bulb.svg?react";
import Button from "../common/Button";
import ProgressSection from "../challengeDetail/ProgressSection";
import ProgressPracticeSection from "./ProgressPracticeSection";

import type { ChallengeDetail } from "../../types/challenge";

interface Props {
    detail: ChallengeDetail;
    onRefresh: () => void;
}

const ChallengeProgressView = ({ detail, onRefresh }: Props) => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Icon><TrophyIcon /></Icon>
                <Title>{detail.title}</Title>
                <How>{detail.goal}</How>
                <Goal>(목표: {detail.totalCount}회)</Goal>
            </Header>

            <ProgressSection
                period={detail.period}
                currentCount={detail.currentCount}
                targetCount={detail.totalCount}
                progressPercent={detail.progressPercent}
            />
            <ProgressPracticeSection
                practices={detail.actions}
                onRefresh={onRefresh}
            />

            <GrowthCard>
                <BulbIcon width={33} height={33} />
                <GrowthTitle>매일의 성장</GrowthTitle>
                <GrowthText>벌써 {detail.currentCount}번째 실천 중이에요! 계속 화이팅!</GrowthText>
            </GrowthCard>

            <Button
                onClick={() => navigate(`/report/${detail.relatedReportId}`)}
            >관련 분석 보러가기</Button>
        </Wrapper >
    );
};

export default ChallengeProgressView;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    > Button {
        height: 47px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.colors.primary[400]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    > svg path {
        fill: ${({ theme }) => theme.colors.primary[600]};
    }
`

const Title = styled.h2`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-bottom: 15px;
    max-width: 280px;
    text-align: center;
    word-break: keep-all;
    white-space: normal;
    line-height: 1.3;
`;

const How = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 10px;
    max-width: 350px;
    text-align: center;
    word-break: keep-all;
    line-height: 1.3;
`

const Goal = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const GrowthCard = styled.div`
    width: 100%;
    padding: 16px;
    background: rgba(200, 230, 201, 0.6);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    > svg path {
        fill: ${({ theme }) => theme.colors.textPrimary};
    }
`;

const GrowthTitle = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-top: 7px;
`;

const GrowthText = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
`;