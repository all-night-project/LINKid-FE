import styled from "styled-components";

interface GuideSectionProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    bgColor?: string;
    fontColor?: string;
    children: React.ReactNode;
}

const GuideSection = ({ icon, title, subtitle, bgColor, fontColor, children }: GuideSectionProps) => {
    return (
        <SectionWrapper $bgColor={bgColor} $fontColor={fontColor}>
            <Header>
                <IconWrapper>{icon}</IconWrapper>
                <TitleWrapper>
                    <Title $fontColor={fontColor}>{title}</Title>
                    {subtitle && <Subtitle $fontColor={fontColor}>{subtitle}</Subtitle>}
                </TitleWrapper>
            </Header>
            <Content>{children}</Content>
        </SectionWrapper>
    );
};

export default GuideSection;

const SectionWrapper = styled.div<{ $bgColor?: string; $fontColor?: string }>`
    background-color: ${({ $bgColor }) => $bgColor || "#FFF"};
    color: ${({ $fontColor }) => $fontColor || "#5A4A42"};
    border-radius: 20px;
    padding: 25px 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const IconWrapper = styled.div``

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Title = styled.p<{ $fontColor?: string }>`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ $fontColor }) => $fontColor || "#5A4A42"};
`;

const Subtitle = styled.p<{ $fontColor?: string }>`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ $fontColor }) => $fontColor || "#5A4A42"};
`;

const Content = styled.div`
    font-size: 1.4rem;
    line-height: 1.3;
`