import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface SpinnerProps {
    size?: number;
    color?: string;
    borderWidth?: number;
}

const Spinner = ({ size = 80, color = "#F4C2C2", borderWidth = 10 }: SpinnerProps) => {
    return <SpinnerCircle $size={size} $color={color} $borderWidth={borderWidth} />;
};

export default Spinner;

const SpinnerCircle = styled.div<{ $size: number; $color: string; $borderWidth: number }>`
    width: ${({ $size }) => `${$size}px`};
    height: ${({ $size }) => `${$size}px`};
    border: ${({ $borderWidth }) => `${$borderWidth}px`} solid #DADADA;
    border-top: ${({ $borderWidth, $color }) => `${$borderWidth}px solid ${$color}`};
    border-radius: 50%;
    animation: ${spin} 1.2s linear infinite;
`;