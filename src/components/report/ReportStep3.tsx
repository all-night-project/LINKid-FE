import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import PercentBar from "../common/PercentBar";

interface StyleAnalysisProps {
    styleAnalysis: {
        parent: {
            metrics: { name: string; value: number }[];
        };
        child: {
            metrics: { name: string; value: number }[];
            aiComment: string;
        };
    }
}

const variantList = ["navy", "pink", "green", "yellow"];

const ReportStep3 = ({ styleAnalysis }: StyleAnalysisProps) => {
    const { parent, child } = styleAnalysis;

    return (
        <Wrapper>
            <SectionCard title="상호작용 스타일 상세 분석" alignment="left">
                {/* 부모 발화 분석 */}
                <SectionTitle>부모 발화 분석</SectionTitle>

                {parent.metrics.map((item, index) => (
                    <PercentBar
                        key={item.name}
                        label={item.name}
                        value={item.value}
                        variant={variantList[index] ?? "navy"}
                    // index가 variantList 범위를 넘어가면 기본값
                    />
                ))}

                {/* 아이 발화 분석 */}
                <SectionTitle>아이 발화 분석</SectionTitle>
                {child.metrics.map((item, index) => (
                    <PercentBar
                        key={item.name}
                        label={item.name}
                        value={item.value}
                        variant={variantList[index] ?? "navy"}
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
    margin-top: 8px;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
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