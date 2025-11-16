import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../router/routes";
import BackIcon from "../../assets/icons/back-arrow.svg?react";

interface HeaderProps {
    title?: String;
    showBack?: boolean;
}

const Header = ({ title, showBack }: HeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    // 페이지별 자동 설정 (title, back)
    const pageHeaderMap: Record<string, { title: String; back?: boolean }> = {
        [ROUTES.GUIDE]: { title: "가이드", back: true },
        [ROUTES.UPLOAD]: { title: "영상 업로드", back: true },
        [ROUTES.ANALYSIS_LOADING]: { title: "영상 분석", back: true },
        [ROUTES.REPORT_LIST]: { title: "영상 분석 리스트", back: true },
        [ROUTES.CHALLENGE_LIST]: { title: "챌린지 리스트", back: true },
        [ROUTES.MYPAGE]: { title: "마이 페이지", back: true },
    }
    const getDynamicTitle = (): { title: String; back?: boolean } | undefined => {
        if (path.startsWith("/report/") && path.endsWith("/step")) {
            return { title: "영상 분석 리포트", back: true };
        }
        if (path.startsWith("/report/")) {
            return { title: "영상 분석 리포트", back: true };
        }
        if (path.startsWith("/challenge/")) {
            return { title: "챌린지 상세보기", back: true };
        }

        return undefined;
    }

    const current = pageHeaderMap[path] || getDynamicTitle() || { title: "LINKid", back: false };

    const displayTitle = title || current.title;
    const displayBack = showBack ?? current.back;

    return (
        <Wrapper>
            {displayBack ? (
                <BackButton onClick={() => navigate(-1)}>
                    <BackIcon />
                </BackButton>
            ) : (
                <Spacer />
            )}
            <Title $isMain={displayTitle === "LINKid"}>{displayTitle}</Title>
            <Spacer />
        </Wrapper>
    );
};

export default Header;

const Wrapper = styled.header`
    display: flex;
    height: 100%;
    padding: 18px;
    align-items: center;
    background-color: white;
`;

const BackButton = styled.div`
    margin-right: 15px;
    margin-top: 3px;
    cursor: pointer;
`
const Spacer = styled.div``

const Title = styled.h1<{ $isMain?: boolean }>`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};

  ${({ $isMain, theme }) =>
        $isMain
            ? `
        font-size: 3.2rem;
        font-family: ${theme.typography.fontFamily};
      `
            : `
        font-size: 2.2rem;
        font-family: ${theme.typography.fontFamily};
      `}
`;