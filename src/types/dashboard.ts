export interface QiScoreItem {
    date: string;   // "08.20"
    score: number;
}

export interface PiNdiItem {
    date: string;   // "08.20"
    pi: number;
    ndi: number;
}

export interface GrowthReport {
    qiScoreHistory: QiScoreItem[];
    piNdiHistory: PiNdiItem[];
}

export interface ActiveChallenge {
    challengeId: number;
    title: string;
    goal: string;
    period: string;
}

export interface DashboardData {
    growthReport: GrowthReport;
    activeChallenge: ActiveChallenge | null;
}