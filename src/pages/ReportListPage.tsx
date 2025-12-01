import styled from "styled-components";
import { useState, useEffect } from "react";
import ReportListItem from "../components/report/ReportListItem";

import type { ReportSummary } from "../types/report";
import { getMyReport } from "../api/report";

const ReportListPage = () => {

    const [reports, setReports] = useState<ReportSummary[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMyReport();
            setReports(res);
        };
        fetchData();
    }, []);

    return (
        <Wrapper>
            {reports.map((r) => (
                <ReportListItem key={r.reportId} report={r} />
            ))}
        </Wrapper>
    );
};

export default ReportListPage;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;