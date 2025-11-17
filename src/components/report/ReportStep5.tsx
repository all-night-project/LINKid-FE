import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import TrophyIcon from "../../assets/icons/trophy.svg?react";

interface GrowthReportProps {
    growthReport: {
        lastChallengeResult: string;
        metricChanges: {
            label: string;
            before: number;
            after: number;
            diff: number;
        }[];
        summary: string;
    };
}

const ReportStep5 = ({ growthReport }: GrowthReportProps) => {
    return (
        <Wrapper>
            <SectionCard title="나의 성장 리포트" alignment="left">
                {/* 지난 챌린지 */}
                <BlockBox>
                    <BlockTitle>
                        <TrophyIcon />
                        <span>지난 챌린지 결과</span>
                    </BlockTitle>
                    <BlockText>{growthReport.lastChallengeResult}</BlockText>
                </BlockBox>

                {/* 핵심 지표 변화 */}
                <DiffTitle>핵심 지표 변화 (지난 회차 기준)</DiffTitle>
                <IndicatorList>
                    {growthReport.metricChanges.map((item, index) => (
                        <IndicatorCard key={index}>
                            <IndicatorLeft>
                                <IndicatorName>{item.label}</IndicatorName>
                                <span>{item.before}% → {item.after}%</span>
                            </IndicatorLeft>
                            <Diff $isPositive={item.diff > 0}>
                                {item.diff > 0 ? `↑ +${item.diff}%p` : `↓ ${item.diff}%p`}
                            </Diff>
                        </IndicatorCard>
                    ))}
                </IndicatorList>

                <SummaryBox>{growthReport.summary}</SummaryBox>
            </SectionCard>
        </Wrapper >
    );
};

export default ReportStep5;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const BlockBox = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.secondary[800]};
    padding: 13px 11px;
    border-radius: 10px;
    gap: 7px;
`;

const BlockTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    gap: 6px;

    svg {
        width: 24px;
        height: 24px;
    }
`;

const BlockText = styled.div`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    line-height: 1.3;
    margin-left: 2px;
`;

const DiffTitle = styled.div`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-top: 10px;
`;

const IndicatorList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const IndicatorCard = styled.div`
    background-color: ${({ theme }) => theme.colors.primary[400]};
    padding: 11px 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IndicatorLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
        color: ${({ theme }) => theme.colors.textPrimary};
        font-size: 1.3rem;
        font-weight: ${({ theme }) => theme.typography.weights.regular};
    }
`;

const IndicatorName = styled.div`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Diff = styled.div<{ $isPositive: boolean }>`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ $isPositive }) => ($isPositive ? "#FF6B6B" : "#5A8FFF")};
`;

const SummaryBox = styled.div`
    background: ${({ theme }) => theme.colors.gray[200]};
    padding: 13px 15px;
    border-radius: 10px;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`;