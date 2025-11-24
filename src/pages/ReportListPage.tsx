import styled from "styled-components";
import ReportListItem from "../components/report/ReportListItem";
import type { ReportItem } from "../types/report";

const mockReports: ReportItem[] = [
    {
        id: 1,
        createdAt: "2025-10-08T15:32:00",
        situation: "아침 준비",
        pattern: "공감적 협력",
        duration: "8분 30초",
        positive: 15,
        negative: 8,
    },
    {
        id: 2,
        createdAt: "2025-10-08T15:32:00",
        situation: "자유 놀이",
        pattern: "공감적 협력",
        duration: "8분 30초",
        positive: 15,
        negative: 8,
    },
];

const ReportListPage = () => {
    return (
        <Wrapper>
            {mockReports.map((r) => (
                <ReportListItem key={r.id} report={r} />
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