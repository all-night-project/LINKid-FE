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

`;