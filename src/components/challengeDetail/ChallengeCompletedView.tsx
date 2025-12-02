import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TrophyIcon from "../../assets/icons/trophy.svg?react";
import CompletedPracticeSection from "./CompletedPracticeSection";
import Button from "../common/Button";

import type { ChallengeDetail } from "../../types/challenge";

const ChallengeCompletedView = ({ detail }: { detail: ChallengeDetail }) => {

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Icon><TrophyIcon /></Icon>
                <Title>{detail.title}</Title>
                <How>{detail.goal}</How>
                <Achievement>달성률 {detail.progressPercent}%</Achievement>
            </Header>

            <CompletedPracticeSection
                practices={detail.actions}
            />

            <Button
                onClick={() => navigate(`/report/${detail.relatedReportId}`)}
            >관련 분석 보러가기</Button>

        </Wrapper>
    )

};

export default ChallengeCompletedView;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > Button {
        height: 47px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
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

const Achievement = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.navy};
    background: rgba(107, 123, 201, 0.5);
    padding: 6px 20px;
    border-radius: 5px;
`;