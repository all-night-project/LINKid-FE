import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg?react";
import AnalysisIcon from "../../assets/icons/analysis.svg?react";
import TrophyIcon from "../../assets/icons/trophy.svg?react";
import MyIcon from "../../assets/icons/my-page.svg?react";
import { ROUTES } from "../../router/routes";

const Footer = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Wrapper>
            <NavItem to={ROUTES.DASHBOARD} active={currentPath === ROUTES.DASHBOARD}>
                <HomeIcon />
                <Label>홈</Label>
            </NavItem>

            <NavItem to={ROUTES.REPORT_LIST} active={currentPath.startsWith("/report")}>
                <AnalysisIcon />
                <Label>분석</Label>
            </NavItem>

            <NavItem to={ROUTES.CHALLENGE_LIST} active={currentPath.startsWith("/challenge")}>
                <TrophyIcon />
                <Label>챌린지</Label>
            </NavItem>

            <NavItem to={ROUTES.MYPAGE} active={currentPath === ROUTES.MYPAGE}>
                <MyIcon />
                <Label>마이</Label>
            </NavItem>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.nav`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 8px 0;
    background-color: ${({ theme }) => theme.colors.white};
`;

interface NavItemProps {
    active?: boolean;
}

const NavItem = styled(Link) <NavItemProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    text-decoration: none;

    svg {
        fill: ${({ theme, active }) =>
        active ? theme.colors.primary[500] : theme.colors.textPrimary};
    }
`;

const Label = styled.span`
    font-size: 13px;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;