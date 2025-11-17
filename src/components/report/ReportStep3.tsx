import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import PercentBar from "../common/PercentBar";

interface StyleAnalysisProps {
    styleAnalysis: {
        parent: {
            metrics: { name: string; value: number }[];
            comparison: any[];
        };
        child: {
            metrics: { name: string; value: number }[];
            aiComment: string;
        };
    }
}

const variantMap: Record<string, "navy" | "pink" | "green"> = {
    "반영적 듣기": "navy",
    "칭찬": "pink",
    "지시형 발화": "green",
    "자발적 발화": "navy",
    "응답형 발화": "pink",
};

const ReportStep3 = ({ styleAnalysis }: StyleAnalysisProps) => {
    const { parent, child } = styleAnalysis;

    return (
        <Wrapper>
            <SectionCard title="상호작용 스타일 상세 분석" alignment="left">
                {/* 부모 발화 분석 */}
                <SectionTitle>부모 발화 분석</SectionTitle>

                {parent.metrics.map((item) => (
                    <PercentBar
                        key={item.name}
                        label={item.name}
                        value={item.value}
                        variant={variantMap[item.name] ?? "navy"}
                    // name이 매핑에 없으면 기본 navy
                    />
                ))}

                <GuideText>권장 범위: 15% ~ 25%</GuideText>

                {/* 아이 발화 분석 */}
                <SectionTitle>아이 발화 분석</SectionTitle>
                {child.metrics.map((item) => (
                    <PercentBar
                        key={item.name}
                        label={item.name}
                        value={item.value}
                        variant={variantMap[item.name] ?? "pink"}
                    />
                ))}

                <SummaryBox>{child.aiComment}</SummaryBox>
            </SectionCard>
        </Wrapper>
    );
};

export default ReportStep3;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > SectionCard {
        padding: 24px 22px;
    }
`;

const SectionTitle = styled.p`
    margin-top: 3px;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const GuideText = styled.p`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 10px;
`;

const SummaryBox = styled.div`
    background-color: #F2F2F9;
    color: ${({ theme }) => theme.colors.navy};
    font-size: 1.3rem;
    padding: 15px;
    margin-top: 13px;
    border-radius: 10px;
    line-height: 1.5;
`;