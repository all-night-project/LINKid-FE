import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import ChartIcon from "../../assets/icons/chart.svg?react";
import QIScoreChart from "./QIScoreChart";
import PINDIChart from "./PINDIChart";

import type { GrowthReport } from "../../types/dashboard";

interface ReportSectionProps {
    growthReport: GrowthReport;
}

const ReportSection = ({ growthReport }: ReportSectionProps) => {
    const { qiScoreHistory, piNdiHistory } = growthReport;

    const hasQi = qiScoreHistory.length > 0;
    const hasPiNdi = piNdiHistory.length > 0;

    // QI 설명 문구
    let qiText = "아직 QI 점수 데이터가 없어요. 첫 리포트를 생성해보세요.";
    if (hasQi) {
        const first = qiScoreHistory[0].score;
        const last = qiScoreHistory[qiScoreHistory.length - 1].score;
        const diff = last - first;

        if (diff > 0) {
            qiText = `${last}점을 달성했어요! 처음보다 ${diff}점 성장하고 있습니다.`;
        } else if (diff < 0) {
            qiText = `${last}점을 기록했어요. 처음보다 ${Math.abs(
                diff
            )}점 감소했어요.`;
        } else {
            qiText = `${last}점을 유지하고 있어요. 꾸준함이 가장 큰 힘이에요.`;
        }
    }

    // PI/NDI 설명 문구
    let piNdiText =
        "아직 PI/NDI 데이터가 없어요. 상호작용 리포트가 쌓이면 변화를 볼 수 있어요.";
    if (hasPiNdi) {
        const last = piNdiHistory[piNdiHistory.length - 1];
        piNdiText = `최근 기록 기준, 긍정(PI) ${last.pi}점, 지시적(NDI) ${last.ndi}점이에요. 긍정(PI)는 높을수록, 지시적(NDI)은 낮을수록 건강한 균형입니다.`;
    }

    return (
        <Wrapper>
            <SectionCard
                icon={<ChartIcon />}
                title="나의 성장 리포트"
                alignment="left"
                iconBg="transparent"
                size={25}
            >
                <SubCard>
                    <SubTitle>종합 상호작용 점수(QI Score) 변화</SubTitle>
                    <Description>{qiText}</Description>
                    <ChartArea>
                        {hasQi ? (
                            <QIScoreChart data={qiScoreHistory} />
                        ) : (
                            <EmptyText>{qiText}</EmptyText>
                        )}
                    </ChartArea>
                </SubCard>
                <SubCard>
                    <SubTitle>긍정/지시적 상호작용(PI/NDI) 변화</SubTitle>
                    <Description>긍정(PI)는 높을수록, 지시적(NDI) 상호작용은 낮을수록 건강한 균형입니다.</Description>
                    <ChartArea>
                        {hasPiNdi ? (
                            <PINDIChart data={piNdiHistory} />
                        ) : (
                            <EmptyText>{piNdiText}</EmptyText>
                        )}
                    </ChartArea>
                </SubCard>
            </SectionCard>
        </Wrapper>
    );
};

export default ReportSection;

const Wrapper = styled.div`
    width: 100%;
`;

const SubCard = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray[500]};
    border-radius: ${({ theme }) => theme.radius.md};
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SubTitle = styled.p`
    font-size: 16px;
    font-weight: 600;
`;

const Description = styled.p`
    font-size: 13px;
    font-weight: 400;
    line-height: 1.3;
`;

const ChartArea = styled.div`
    margin-top: 8px;
`;

const EmptyText = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.gray[600]};
    text-align: center;
    padding: 16px 30px;
    word-break: keep-all;
    white-space: normal;
    line-height: 1.3;
`;
