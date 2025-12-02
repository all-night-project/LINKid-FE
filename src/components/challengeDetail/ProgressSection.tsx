import styled from "styled-components";

export interface ProgressSectionProps {
    period: string;
    currentCount: number;
    targetCount: number;
    progressPercent: number;
}

const ProgressSection = ({ period, currentCount, targetCount, progressPercent }: ProgressSectionProps) => {
    return (
        <Card>
            <Header>
                <Title>진행 현황</Title>
                <PercentTag>{progressPercent}%</PercentTag>
            </Header>

            <Bar>
                <Fill style={{ width: `${progressPercent}%` }} />
            </Bar>

            <Bottom>
                <Period>{period}</Period>
                <Count>{currentCount} / {targetCount}회</Count>
            </Bottom>
        </Card>
    );
};

export default ProgressSection;

const Card = styled.div`
    width: 100%;
    padding: 18px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Title = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const PercentTag = styled.div`
    padding: 3px 12px;
    background: rgba(107, 123, 201, 0.5);
    border-radius: 5px;
    font-size: 1.5rem;
    color: #5A76A9;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`

const Bar = styled.div`
    width: 100%;
    height: 10px;
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 20px;
`;

const Fill = styled.div`
    height: 100%;
    background: ${({ theme }) => theme.colors.primary[500]};
    border-radius: 20px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`
const Period = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const Count = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;