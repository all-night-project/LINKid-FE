import styled from "styled-components";
import SectionCard from "../../../components/common/SectionCard";
import Button from "../../../components/common/Button";
import TrophyIcon from "../../../assets/icons/trophy.svg?react";
import FlagIcon from "../../../assets/icons/flag.svg?react";
import ClockIcon from "../../../assets/icons/clock.svg?react";

const ChallengeButton = styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: 15px;
    color: white;
`;

const ChallengeSection = () => {
    return (
        <Wrapper>
            <SectionCard
                icon={<TrophyIcon />}
                title="이번 주 핵심 챌린지"
            >
                <SectionDescription>
                    '긍정적 기회 놓치기' 3회 도전!
                </SectionDescription>
                <SubCard>
                    <SubHeader>
                        <FlagIcon />
                        <SubTitle>목표</SubTitle>
                    </SubHeader>
                    <Description>아이가 성취나 행동을 공유할 때 즉시 긍정적으로 반응하기</Description>
                </SubCard>
                <SubCard>
                    <SubHeader>
                        <ClockIcon />
                        <SubTitle>기간</SubTitle>
                    </SubHeader>
                    <Description>7일간 (2025.01.15. ~ 2025.01.22.)</Description>
                </SubCard>
                <ChallengeButton>챌린지 보러가기</ChallengeButton>
            </SectionCard>
        </Wrapper>
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
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;


