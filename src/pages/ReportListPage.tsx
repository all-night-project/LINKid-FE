import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReportListItem from "../components/report/ReportListItem";
import Button from "../components/common/Button";

import type { ReportSummary } from "../types/report";
import { getMyReport } from "../api/report";

const ReportListPage = () => {
    const navigate = useNavigate();
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
            {reports.length === 0 ? (
                <EmptyState>
                    <EmptyText>아직 생성된 리포트가 없어요.</EmptyText>
                    <SubText>아이와의 상호작용을 분석하고 첫 리포트를 만들어보세요!</SubText>

                    <Button
                        variant="primary"
                        onClick={() => navigate("/upload")}
                    >
                        분석하러 가기
                    </Button>
                </EmptyState>
            ) : (
                reports.map((r) => (
                    <ReportListItem key={r.reportId} report={r} />
                ))
            )}
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

const EmptyState = styled.div`
    width: 100%;
    padding: 80px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    > Button {
        width: 70%;
    }
`;

const EmptyText = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubText = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 260px;
    line-height: 1.4;
    word-break: keep-all;
`;