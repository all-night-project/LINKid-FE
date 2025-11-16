import styled from "styled-components";
import UploadCard from "../components/dashboard/UploadCard";
import ReportSection from "../components/dashboard/ReportSection";
import ChallengeSection from "../components/dashboard/ChallengeSection";
import GuideCard from "../components/dashboard/GuideCard";

const DashboardPage = () => {
    return (
        <Wrapper>
            <UploadCard />
            <ReportSection />
            <ChallengeSection />
            <GuideCard />
        </Wrapper>
    );
};

export default DashboardPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;