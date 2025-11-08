import { Outlet } from "react-router-dom";
import styled from "styled-components";

const PlainLayout = () => {
    return (
        <Wrapper>
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