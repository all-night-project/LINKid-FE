import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import UploadIcon from "../../assets/icons/upload.svg?react";
import { ROUTES } from "../../router/routes";

const UploadButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.background};
    height: 42px;
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 16px;
`;

const UploadCard = () => {
    const navigate = useNavigate();

    return (
        <Card>
            <Header>
                <UploadIcon />
                <TextWrapper>
                    <Title>영상 업로드</Title>
                    <Description>새로운 상호작용을 분석해보세요</Description>
                </TextWrapper>
            </Header>
            <UploadButton onClick={() => navigate(ROUTES.UPLOAD)}>업로드하기</UploadButton>
        </Card>
    );
};

export default UploadCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary[500]};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 20px;
    gap: 20px;
`;

const Header = styled.div`
    display: flex;
    gap: 13px;
    align-items: center;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 11px;
`;

const Title = styled.p`
    color: ${({ theme }) => theme.colors.background};
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: 2rem;
`;

const Description = styled.p`
    color: ${({ theme }) => theme.colors.background};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 1.6rem;
`;