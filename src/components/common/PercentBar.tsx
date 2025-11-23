import styled, { css } from "styled-components";

interface PercentBarProps {
    label: string;
    value: number;
    variant?: "pink" | "green" | "navy" | "yellow";
}

const PercentBar = ({ label, value, variant = "pink" }: PercentBarProps) => {

    return (
        <Wrapper>
            <Row>
                <Label>{label}</Label>
                <Value variant={variant}>{value}%</Value>
            </Row>
            <BarBackground>
                <BarFill value={value} variant={variant}></BarFill>
            </BarBackground>
        </Wrapper>
    );
};

export default PercentBar;

const variantStyles = {
    pink: {
        label: css`
            color: ${({ theme }) => theme.colors.primary[600]};
        `,
        barFill: css`
            background-color: ${({ theme }) => theme.colors.primary[500]};
        `,
    },
    green: {
        label: css`
            color: ${({ theme }) => theme.colors.secondary[600]};
        `,
        barFill: css`
            background-color: ${({ theme }) => theme.colors.secondary[500]};
        `
    },
    navy: {
        label: css`
            color: #312E81;
        `,
        barFill: css`
            background: #312E81;
        `
    },
    yellow: {
        label: css`
            color: #FFC107;
        `,
        barFill: css`
            background: #FFC107;
        `
    }
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 4px;
`

const Label = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.regular};
`

const Value = styled.p<{ variant: "pink" | "green" | "navy" }>`
    ${({ variant }) => variantStyles[variant].label};
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const BarBackground = styled.div`
    width: 100%;
    height: 11px;
    border-radius: 10px;
    background: #F6F6F6;
`;

const BarFill = styled.div<{ value: number; variant: "pink" | "green" | "navy" }>`
    ${({ variant }) => variantStyles[variant].barFill};
    width: ${({ value }) => value}%;
    height: 11px;
    border-radius: 10px;
    transition: width 0.4s ease;
`;