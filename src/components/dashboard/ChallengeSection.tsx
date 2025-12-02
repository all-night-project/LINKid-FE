import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import Button from "../common/Button";
import TrophyIcon from "../../assets/icons/trophy.svg?react";
import FlagIcon from "../../assets/icons/flag.svg?react";
import ClockIcon from "../../assets/icons/clock.svg?react";

import type { ActiveChallenge } from "../../types/dashboard";
import { useNavigate } from "react-router-dom";

const ChallengeButton = styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: 15px;
    color: white;
`;

interface ChallengeSectionProps {
    activeChallenge: ActiveChallenge;
}

const ChallengeSection = ({ activeChallenge }: ChallengeSectionProps) => {
    const navigate = useNavigate();

    if (!activeChallenge) {
        return (
            <Wrapper>
                <SectionCard
                    icon={<TrophyIcon />}
                    title="이번 주 핵심 챌린지"
                    alignment="left"
                    iconBg="transparent"
                    size={25}
                >
                    <EmptyText>아직 생성된 챌린지가 없어요!</EmptyText>
                </SectionCard>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <SectionCard
                icon={<TrophyIcon />}
                title="이번 주 핵심 챌린지"
                alignment="left"
                iconBg="transparent"
                size={25}
            >
                <SectionDescription>
                    {activeChallenge.title}
                </SectionDescription>
                <SubCard>
                    <SubHeader>
                        <FlagIcon />
                        <SubTitle>목표</SubTitle>
                    </SubHeader>
                    <Description>{activeChallenge.goal}</Description>
                </SubCard>
                <SubCard>
                    <SubHeader>
                        <ClockIcon />
                        <SubTitle>기간</SubTitle>
                    </SubHeader>
                    <Description>{activeChallenge.period}</Description>
                </SubCard>
                <ChallengeButton
                    onClick={() => navigate(`/challenge/${activeChallenge.challengeId}`)}
                >챌린지 보러가기</ChallengeButton>
            </SectionCard>
        </Wrapper >
    );
};

export default ChallengeSection;

const Wrapper = styled.div`
    width: 100%;
`;

const SectionDescription = styled.div`
    color: ${({ theme }) => theme.colors.primary[600]};
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    margin-left: 5px;
`;

const SubHeader = styled.div`
    display: flex;
    gap: 5px;
`;

const SubCard = styled.div`
    border: 0.7px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SubTitle = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Description = styled.p`
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.3;
`;

const EmptyText = styled.p`
    color: ${({ theme }) => theme.colors.primary[600]};
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    text-align: center;
`;
