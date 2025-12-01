export interface Challenge {
    challengeId: number;
    title: string;
    period: string;            // "12월 1일 ~ 12월 8일"
    progressPercent: number;   // 0 ~ 100
    status: "ACTIVE" | "COMPLETED";
}

export interface ChallengeAction {
    actionId: number;
    content: string;
    completedDate: string | null;
    reflection: string | null;
    completed: boolean;
}

export interface ChallengeDetail {
    challengeId: number;
    title: string;
    goal: string;
    period: string; // "11월 24일 ~ 12월 1일"
    progressPercent: number;
    currentCount: number;
    totalCount: number;
    relatedReportId: number;
    actions: ChallengeAction[];
}
