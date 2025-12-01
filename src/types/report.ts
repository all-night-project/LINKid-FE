export interface ReportSummary {
    reportId: number;
    createdAt: string; // ISO 날짜 문자열
    contextTag: string;
    durationSeconds: number;
    relationshipStatus: string;
    piScore: number;
    ndiScore: number;
}
}