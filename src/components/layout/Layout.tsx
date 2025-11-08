import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <Main>
        <Outlet />
      </Main>

      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderWrapper = styled.header``;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 18px;
`;

const FooterWrapper = styled.footer`
`;