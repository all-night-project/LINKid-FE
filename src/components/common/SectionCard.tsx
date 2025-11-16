import styled from "styled-components";
import type { ReactNode } from "react";

interface SectionCardProps {
    icon?: ReactNode;
    title: string;
    children: ReactNode;
}

const SectionCard = ({ icon, title, children }: SectionCardProps) => {
    return (
        <Wrapper>
            <Header>
                {icon && <IconWrapper>{icon}</IconWrapper>}
                <Title>{title}</Title>
            </Header>
            <Content>{children}</Content>
        </Wrapper>
    );
};

export default SectionCard;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 18px;
    background-color: white;
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
    gap: 8px;
`;

const Header = styled.div`
    display: flex;
    gap: 5px;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`