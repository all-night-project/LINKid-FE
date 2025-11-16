import styled from "styled-components";
import SectionCard from "../common/SectionCard";
import ChartIcon from "../../../assets/icons/chart.svg?react";

const ReportSection = () => {
    return (
        <Wrapper>
            <SectionCard
                icon={<ChartIcon />}
                title="나의 성장 리포트"
            >
                <SubCard>
                    <SubTitle>종합 상호작용 점수(QI Score) 변화</SubTitle>
                    <Description>75점을 달성했어요! 꾸준히 성장하고 있습니다.</Description>
                    {/* <QIScoreChart /> */}
                </SubCard>
                <SubCard>
                    <SubTitle>긍정/지시적 상호작용(PI/NDI) 변화</SubTitle>
                    <Description>긍정(PI)는 높을수록, 지시적(NDI) 상호작용은 낮을수록 건강한 균형입니다.</Description>
                    {/* <PINDIChart /> */}
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
`

const SubTitle = styled.p`
    font-size: 16px;
    font-weight: 600;
`

const Description = styled.p`
    font-size: 13px;
    font-weight: 400;
`


