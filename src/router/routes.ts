export const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    GUIDE: "/guide",
    DASHBOARD: "/",
    UPLOAD: "/upload",
    ANALYSIS_LOADING: '/analysis/loading',
    REPORT_STEP: (id: string) => `/report/${id}/step`,
    REPORT: (id: string) => `/report/${id}`,
    REPORT_LIST: "/report/list",
    CHALLENGE_LIST: "/challenge",
    CHALLENGE_DETAIL: (id: string) => `/challenge/${id}`,
    MYPAGE: "/mypage",
};