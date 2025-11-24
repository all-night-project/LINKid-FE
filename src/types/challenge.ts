// 원본 API 형태
export interface StrategyGuide {
    examples: string[];
}

export interface PracticeLog {
    logId: number;
    memo: string;
    createdAt: string;
}

export interface ChallengeDetail {
    challengeId: number;
    title: string;
    how: string;
    period: string;
    status: "ACTIVE" | "FINISHED";
    sourceReportId: number;
    description: string;
    targetCount: number;
    strategyGuide: StrategyGuide;
    practiceLogs: PracticeLog[];
    currentCount: number;
}

// UI 렌더용 타입
export interface PracticeItem {
    id: number;
    label: string;
    completed: boolean;
    createdAt: string | null;
    review: string | null;
}

// ChallengeDetail + PracticeItem 합친 최종 타입
export interface ChallengeWithPractices extends ChallengeDetail {
    practices: PracticeItem[];
}