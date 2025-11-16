import styled, { css } from "styled-components";
import SectionCard from "../../../components/common/SectionCard";
import Button from "../../../components/common/Button";
import QuestionIcon from "../../../assets/icons/question.svg?react";
import FreePlayIcon from "../../../assets/icons/play.svg?react";
import MealIcon from "../../../assets/icons/meal.svg?react";
import StudyIcon from "../../../assets/icons/study.svg?react";
import EtcIcon from "../../../assets/icons/etc.svg?react";

interface VideoSituationSelectorProps {
    selectedSituation: string | null;
    setSelectedSituation: (value: string) => void;
}

const situations = [
    { label: "자유놀이", icon: <FreePlayIcon /> },
    { label: "식사시간", icon: <MealIcon /> },
    { label: "학습활동", icon: <StudyIcon /> },
    { label: "기타", icon: <EtcIcon /> },
];

const VideoSituationSelector = ({ selectedSituation, setSelectedSituation }: VideoSituationSelectorProps) => {
    return (
        <Wrapper>
            <SectionCard
                icon={<QuestionIcon />}
                title="영상 상황을 알려주세요"
            >
                <Subtitle>어떤 상황의 영상인가요?</Subtitle>
                <ButtonGroup>
                    {situations.map(({ label, icon }) => (
                        <SituationButton
                            key={label}
                            $selected={selectedSituation === label}
                            onClick={() => setSelectedSituation(label)}
                        >
                            {icon}
                            <span>{label}</span>
                        </SituationButton>
                    ))}
                </ButtonGroup>
            </SectionCard>
        </Wrapper>
    );
}

export default VideoSituationSelector;

const Wrapper = styled.div`
    width: 100%;
`;

const Subtitle = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
`;

const SituationButton = styled(Button) <{ $selected?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: auto;
    padding: 20px;
    gap: 10px;
    border-radius: ${({ theme }) => theme.typography.sizes.sm};
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};

    transition: all 0.2s ease;

    ${({ $selected, theme }) =>
        $selected &&
        css`
        background-color: ${theme.colors.primary[400]};
        `}
`;