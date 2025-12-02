import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import HeartIcon from "../../assets/icons/heart.svg?react";
import ProgressBar from "../common/PercentBar";

interface DashboardProps {
    dashboard: {
        positive_ratio: number;
        negative_ratio: number;
        stage_name: string;
    }
}

const ReportStep1 = ({ dashboard }: DashboardProps) => {
    const piScore = Math.round(dashboard.positive_ratio * 100);
    const ndiScore = Math.round(dashboard.negative_ratio * 100);

    return (
        <Wrapper>
            <SectionCard
                icon={<HeartIcon />}
                title="오늘의 상호작용 진단"
                alignment="top"
                iconBg="#FAEFEF"
                size={45}
            >
                <Description>
                    현재 두 분의 관계는 '{dashboard.stage_name}' 단계입니다
                </Description>
                <ProgressWrapper>
                    <ProgressBar label="긍정 상호작용" value={piScore} variant="pink" />
                    <ProgressBar label="부정 상호작용" value={ndiScore} variant="green" />
                </ProgressWrapper>
            </SectionCard>
        </Wrapper >
    );
};

export default ReportStep1;

const Wrapper = styled.div`
    > SectionCard {
        padding: 24px 22px;
    }
`;

const Description = styled.p`
    text-align: center;
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};

    margin-top: 6px;
    margin-bottom: 20px;
`;

const ProgressWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`