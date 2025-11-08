import styled, { css } from "styled-components";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: String;
    error?: String;
}

const Input = ({ label, error, ...props }: InputProps) => {
    return (
        <Wrapper>
            {label && <Label>{label}</Label>}
            <StyledInput hasError={!!error} {...props} />
            {error && <ErrorText>{error}</ErrorText>}
        </Wrapper>
    );
};

export default Input;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.label`
    font-size: ${({ theme }) => theme.typography.sizes.md};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-left: 9px;
`

const StyledInput = styled.input<{ hasError: boolean }>`
    width: 100%;
    height: 45px;
    padding: 14px 16px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: white;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    ${({ hasError, theme }) =>
        hasError &&
        css`
            border-color: ${theme.colors.primary[600]};
        `
    }
`;

const ErrorText = styled.span`
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.primary[600]};
`;