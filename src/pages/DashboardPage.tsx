import styled from "styled-components";
import { useState, useEffect } from "react";
import UploadCard from "../components/dashboard/UploadCard";
import ReportSection from "../components/dashboard/ReportSection";
import ChallengeSection from "../components/dashboard/ChallengeSection";
import GuideCard from "../components/dashboard/GuideCard";

import { api } from "../api/axios";
import type { DashboardData } from "../types/dashboard";

const DashboardPage = () => {
    const [dashboard, setDashboard] = useState<DashboardData>();

    useEffect(() => {
        const fetch = async () => {
            const res = await api.get("/home");
            setDashboard(res.data.data);
        };
        fetch();
    }, []);

    if (!dashboard) return <div>불러오는 중...</div>;

    const { growthReport, activeChallenge } = dashboard;

    return (
        <Wrapper>
            <UploadCard />
            <ReportSection growthReport={growthReport} />
            <ChallengeSection activeChallenge={activeChallenge} />
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