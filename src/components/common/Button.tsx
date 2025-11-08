import styled, { css } from "styled-components";
import type { ReactNode } from "react";


interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "gray" | "disabled";
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit";
    className?: string;
}

const Button = ({
    children,
    variant = "primary",
    icon,
    onClick,
    disabled,
    type = "button",
    className,
}: ButtonProps) => {
    return (
        <StyledButton
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={className}
        >
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {children}
        </StyledButton>
    );
};

export default Button;

const StyledButton = styled.button<{ variant: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: ${({ theme }) => theme.typography.weights.bold};

    ${({ variant, theme }) =>
        variant === "primary"
            ? css`
                background-color: ${theme.colors.primary[500]};
                color: ${theme.colors.textPrimary};
            `
            : variant === "gray"
                ? css`
                background-color: ${theme.colors.gray[500]};
                color: ${theme.colors.gray[600]};
            `
                : css`
                background-color: ${theme.colors.primary[400]};
                border: 2px solid ${theme.colors.primary[500]};
                color: ${theme.colors.textSecondary};
            `}
    
    &:hover {
        opacity: 0.85;
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;