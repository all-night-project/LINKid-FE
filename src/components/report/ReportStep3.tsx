import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import PercentBar from "../common/PercentBar";

import type { StyleAnalysisDataType } from "../../types/report";

interface ReportStep3Props {
    styleAnalysis: StyleAnalysisDataType;
}

const variantMap = ["navy", "pink", "green", "yellow"] as const;

const ReportStep3 = ({ styleAnalysis }: ReportStep3Props) => {
    const parent = styleAnalysis.interaction_style.parent_analysis?.categories ?? [];
    const child = styleAnalysis.interaction_style.child_analysis?.categories ?? [];

    return (
        <Wrapper>
            <SectionCard title="상호작용 스타일 상세 분석" alignment="left">
                {/* 부모 발화 분석 */}
                <SectionTitle>부모 발화 분석</SectionTitle>

                {parent
                    .filter((item) => item.ratio > 0)
                    .map((item, index) => (
                        <PercentBar
                            key={index}
                            label={item.name}
                            value={Math.round(item.ratio * 100)}
                            variant={variantMap[index] ?? "navy"}
                        />
                    ))}

                {/* 아이 발화 분석 */}
                <SectionTitle>아이 발화 분석</SectionTitle>
                {child
                    .filter((item) => item.ratio > 0)
                    .map((item, index) => (
                        <PercentBar
                            key={index}
                            label={item.name}
                            value={Math.round(item.ratio * 100)}
                            variant={variantMap[index] ?? "navy"}
                        />
                    ))}

                <SummaryBox>{styleAnalysis.summary}</SummaryBox>
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