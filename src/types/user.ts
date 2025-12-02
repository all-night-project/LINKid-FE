export interface ChildInfo {
    childId: number;
    name: string;
    birthdate: string; // ISO date string
    gender: string;
}

export interface ActivitySummary {
    totalReports: number;
    totalChallenges: number;
}

export interface MyPageInfoResponse {
    data: {
        userName: string;
        childInfo: ChildInfo;
        activitySummary: ActivitySummary;
    };
}