import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ScrollToTop from "../../router/ScrollToTop";

const PlainLayout = () => {
    return (
        <Wrapper>
            <ScrollToTop />
            <Outlet />
        </Wrapper>
    );
};

export default PlainLayout;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    max-width: 440px;
    min-height: 100vh;
    padding: 18px;
    background-color: ${({ theme }) => theme.colors.background};
`;