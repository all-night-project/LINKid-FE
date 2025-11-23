import styled, { css } from "styled-components";
import type { ReactNode } from "react";

interface SectionCardProps {
    icon?: ReactNode;
    title: string;
    alignment?: "top" | "left";
    iconBg?: string;
    size?: number;
    children: ReactNode;
}

const SectionCard = ({
    icon,
    title,
    alignment = "top",
    iconBg = "#FAEFEF",
    size = 36,
    children
}: SectionCardProps) => {
    return (
        <Wrapper>
            <Header alignment={alignment}>
                {icon && (
                    <IconWrapper iconBg={iconBg} size={size}>
                        {icon}
                    </IconWrapper>
                )}
                <Title>{title}</Title>
            </Header>
            <Content>{children}</Content>
        </Wrapper>
    );
};

export default SectionCard;

const alignmentStyles = {
    top: css`
        flex-direction: column;
        align-items: center;
        gap: 11px;
    `,
    left: css`
        flex-direction: row;
        align-items: center;
        gap: 4px;
    `
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 18px;
    background-color: white;
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
    gap: 8px;
`;

const Header = styled.div<{ alignment: "top" | "left" }>`
    display: flex;
    ${({ alignment }) => alignmentStyles[alignment]};
`;

const IconWrapper = styled.div<{ iconBg: string; size: number }>`
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${({ size }) => `${size + 10}px`};
    height: ${({ size }) => `${size + 10}px`};
    border-radius: 50%;
    background: ${({ iconBg }) => iconBg};

    > svg {
        width: ${({ size }) => `${size}px`};
        height: ${({ size }) => `${size}px`};
    }

    flex-shrink: 0;
`;

const Title = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;