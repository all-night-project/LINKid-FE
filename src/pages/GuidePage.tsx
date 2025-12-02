import styled from "styled-components";
import AboutServiceSection from "../components/guide/AboutServiceSection";
import VideoGuideSection from "../components/guide/VideoGuideSection";
import SecuritySection from "../components/guide/SecuritySection";

const GuidePage = () => {
    return (
        <Wrapper>
            <AboutServiceSection />
            <VideoGuideSection />
            <SecuritySection />
        </Wrapper>
    );
};

export default GuidePage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;