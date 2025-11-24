export const ROUTES = {
    LOGIN: "/",
    SIGNUP: "/signup",
    GUIDE: "/guide",
    DASHBOARD: "/dashboard",
    UPLOAD: "/upload",
    ANALYSIS_LOADING: '/analysis',
    REPORT_STEP: (id: string, step: number) => `/report/${id}/step/${step}`,
    REPORT: (id: string) => `/report/${id}`,
    REPORT_LIST: "/report/list",
    CHALLENGE_LIST: "/challenge",
    CHALLENGE_DETAIL: (id: string) => `/challenge/${id}`,
    MYPAGE: "/mypage",
} as const;