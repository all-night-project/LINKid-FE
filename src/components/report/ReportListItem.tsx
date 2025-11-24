import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RightArrow from "../../assets/icons/right-arrow.svg?react";
import type { ReportItem } from "../../types/report";

interface ReportItemProps {
    report: ReportItem;
}

const ReportListItem = ({ report }: ReportItemProps) => {
    const dateObj = new Date(report.createdAt);
    const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = dateObj.toTimeString().slice(0, 5);

    const navigate = useNavigate();

    return (
        <Card onClick={() => navigate(`/report/${report.id}`)}>
            <Top>
                <DateText>{date}</DateText>
                <TimeText>{time}</TimeText>
                <RightArrow />
            </Top>

            <TagList>
                <Tag bg="#FFF3E0">{report.situation}</Tag>
                <Tag bg="#EAEAF6">{report.pattern}</Tag>
                <Duration>{report.duration}</Duration>
            </TagList>

            <StatRow>
                <StatBox $type="positive">
                    <StatLabel>긍정적 상호작용</StatLabel>
                    <StatValue $type="positive">{report.positive}</StatValue>
                </StatBox>

                <StatBox $type="negative">
                    <StatLabel>부정적 상호작용</StatLabel>
                    <StatValue $type="negative">{report.negative}</StatValue>
                </StatBox>
            </StatRow>
        </Card>
    );
};

export default ReportListItem;

const Card = styled.div`
    background: white;
    padding: 13px 20px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
    cursor: pointer;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    > svg {
        margin-left: auto;
    }
`;

const DateText = styled.p`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const TimeText = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const TagList = styled.div`
    display: flex;
    gap: 9px;
    align-items: center;
`;

const Tag = styled.span<{ bg: string }>`
    padding: 6px 8px;
    border-radius: 8px;
    background: ${({ bg }) => bg};
    font-size: 1rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const Duration = styled.span`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const StatRow = styled.div`
    display: flex;
    gap: 15px;
`;

const StatBox = styled.div<{ $type: "positive" | "negative" }>`
    flex: 1;
    padding: 16px 15px;
    border-radius: 12px;
    border: 1px solid
        ${({ $type, theme }) => (
        $type === "positive" ? theme.colors.secondary[500] : theme.colors.primary[500]
    )};
    background: ${({ $type, theme }) => (
        $type === "positive" ? theme.colors.secondary[200] : theme.colors.primary[200]
    )};

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StatLabel = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const StatValue = styled.p<{ $type: "positive" | "negative" }>`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ $type, theme }) => (
        $type === "positive" ? theme.colors.secondary[500] : theme.colors.primary[500]
    )};
`;