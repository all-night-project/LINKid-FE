export const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",
    GUIDE: "/guide",
    DASHBOARD: "/",
    UPLOAD: "/upload",
    ANALYSIS_LIST: "/analysis",
    ANALYSIS_DETAIL: (id: string) => `/analysis/${id}`,
    REPORT: (id: string) => `/report/${id}`,
    CHALLENGE_LIST: "/challenge",
    CHALLENGE_DETAIL: (id: string) => `/challenge/${id}`,
    MYPAGE: "/mypage",
};