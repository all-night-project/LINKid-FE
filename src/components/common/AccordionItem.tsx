import styled, { css } from "styled-components";
import ChevronDown from "../../assets/icons/chevron-down.svg?react";
import ChevronUp from "../../assets/icons/chevron-up.svg?react";
import type React from "react";

interface AccordionItemProps {
    question: string;
    children: React.ReactNode;
    variant?: "guide" | "pattern" | "transparent";
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem = ({
    question,
    children,
    variant = "guide",
    isOpen,
    onToggle,
}: AccordionItemProps) => {
    return (
        <Wrapper $variant={variant}>
            <Question $open={isOpen} $variant={variant} onClick={onToggle}>
                {question}
                <IconWrapper $variant={variant}>
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </IconWrapper>
            </Question>

            <AnswerWrapper $open={isOpen} $variant={variant}>
                {children}
            </AnswerWrapper>
        </Wrapper>
    );
};

export default AccordionItem;

const wrapperVariants = {
    guide: css`
        background: rgba(234, 234, 246, 0.3);
        border-radius: 10px;
        margin-top: 15px;
    `,
    pattern: css`
        border-radius: 10px;
    `,
    transparent: css`
        border-radius: 5px;
        background: white;
        border: 0.7px solid ${({ theme }) => theme.colors.primary[500]};
    `
};

const questionVariants = {
    guide: css`
        color: white;
        font-size: 1.6rem;
        padding: 15px;
    `,
    pattern: css`
        color: ${({ theme }) => theme.colors.textPrimary};
        background: ${({ theme }) => theme.colors.primary[400]};
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
        font-size: 1.3rem;
        padding: 12px 15px;
        border-radius: 10px;
    `,
    transparent: css`
        font-size: 1.3rem;
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
        padding: 10px;
    `
};

const answerVariants = {
    guide: css<{ $open: boolean }>`
        padding: ${({ $open }) => ($open ? "0 16px 14px 16px" : "0 16px")};

        li {
            list-style-position: outside;
            margin-bottom: 4px;
        }
    `,
    pattern: css<{ $open: boolean }>`
        margin-top: 10px;
        border: 1px solid ${({ theme }) => theme.colors.primary[400]};
        border-radius: 10px;
        padding: ${({ $open }) => ($open ? "16px" : "0 16px")};
    `,
    transparent: css<{ $open: boolean }>`
        padding: ${({ $open }) => ($open ? "0 13px 5px 11px" : "0 11px")};
        font-size: 1.4rem;
        font-weight: ${({ theme }) => theme.typography.weights.regular};

        li {
            list-style-position: outside;
            margin-bottom: 9px;
        }

    `
}

const Wrapper = styled.div<{ $variant: "guide" | "pattern" | "transparent" }>`
    ${({ $variant }) => wrapperVariants[$variant]}
`;

const Question = styled.div<{ $open: boolean; $variant: "guide" | "pattern" | "transparent" }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    ${({ $variant }) => questionVariants[$variant]}
`;

const IconWrapper = styled.div<{ $variant: "guide" | "pattern" | "transparent" }>`
    display: flex;
    align-items: center;

    svg, svg path {
        ${({ $variant }) =>
        $variant === "guide" &&
        css`
        `}
        
        ${({ $variant }) =>
        $variant === "pattern" &&
        css`
            width: 20px;
            height: 20px;
            stroke: none;
            fill: #5A4A42;
        `}

        ${({ $variant }) =>
        $variant === "transparent" &&
        css`
            width: 22px;
            height: 22px;
            stroke: none;
            fill: ${({ theme }) => theme.colors.primary[500]};
        `}
    }
`

const AnswerWrapper = styled.div<{ $open: boolean; $variant: string }>`
    max-height: ${({ $open }) => ($open ? "auto" : "0px")};
    opacity: ${({ $open }) => ($open ? "1" : "0")};
    transition: all 0.3s ease;
    overflow: hidden;
    

    ul {
        list-style-type: disc;
        padding-left: 18px;
        margin: 6px 0;
    }

    ol {
        list-style-type: decimal;
        padding-left: 18px;
        margin: 6px 0;
        line-height: 1.3;
    }


    ${({ $variant }) => answerVariants[$variant]};
`;