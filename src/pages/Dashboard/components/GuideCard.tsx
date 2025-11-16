import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import GuideIcon from "../../../assets/icons/guide.svg?react";
import { ROUTES } from "../../../router/routes";

const GuideButton = styled(Button)`
    background-color: #EAEAF6;
    height: 42px;
    color: ${({ theme }) => theme.colors.secondary[900]};
    border-radius: ${({ theme }) => theme.radius.md};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const GuideCard = () => {
    const navigate = useNavigate();

    return (
        <Card>
            <Header>
                <TextWrapper>
                    <Title>가이드</Title>
                    <Description>효과적인 상호작용 팁을 확인해보세요</Description>
                </TextWrapper>
                <GuideIcon
                    style={{ filter: "drop-shadow(0 0 10px rgba(255,250,205,1))" }}
                />
            </Header>
            <GuideButton onClick={() => navigate(ROUTES.GUIDE)}>가이드 보기</GuideButton>
        </Card>
    );
};

export default GuideCard;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary[900]};
    border-radius: ${({ theme }) => theme.radius.xl};
    padding: 20px;
    gap: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 11px;
`;

const Title = styled.p`
    color: white;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    font-size: 2rem;
`;

const Description = styled.p`
    color: white;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    font-size: 1.6rem;
`;