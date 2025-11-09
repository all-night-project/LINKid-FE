import styled from "styled-components";
import SecurityIcon from "../../../assets/icons/security.svg?react";
import GuideSection from "./GuideSection";

const SecuritySection = () => {
    return (
        <Wrapper>
            <GuideSection
                icon={<SecurityIcon />}
                title="개인 정보 보안"
                subtitle="데이터는 안전하게 보호됩니다"
            >
                <GuideWrapper>
                    <Circle>1</Circle>
                    <TextGroup>
                        <ItemTitle>분석 즉시 파기</ItemTitle>
                        <ItemDesc>업로드된 영상 원본은 AI 분석이 완료되는 즉시 저희 서버에서 영구적으로 파기됩니다</ItemDesc>
                    </TextGroup>
                </GuideWrapper>
                <GuideWrapper>
                    <Circle>2</Circle>
                    <TextGroup>
                        <ItemTitle>본인만 열람 가능</ItemTitle>
                        <ItemDesc>생성된 리포트는 오직 부모님의 계정으로만 접근할 수 있습니다</ItemDesc>
                    </TextGroup>
                </GuideWrapper>
            </GuideSection>
        </Wrapper>
    );
};

export default SecuritySection;

const Wrapper = styled.div`
    margin-top: 20px;
`
const GuideWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 11px;
    margin-top: 20px;
`;

const Circle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.secondary[500]};
    color: white;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography.weights.extrabold};
    flex-shrink: 0;
`;

const TextGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const ItemTitle = styled.p`
    font-size: 16px;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const ItemDesc = styled.p`
    font-size: 14px;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
`