import { create } from "zustand";

interface AnalysisState {
    status: string;
    statusMessage: string | null;
    isDone: boolean;
    reportId: number | null;

    // [추가] 현재 분석 중인 비디오 ID (페이지 이동해도 기억하기 위함)
    targetVideoId: number | null;

    updateStatus: (status: string, isDone: boolean, reportId: number | null, msg: string | null) => void;

    // [추가] 분석 시작 시 ID 설정
    startAnalysis: (videoId: number) => void;

    // [추가] 리포트 확인 후 상태 초기화
    resetAnalysis: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
    status: "idle",
    statusMessage: null,
    isDone: false,
    reportId: null,
    targetVideoId: null,

    updateStatus: (status, isDone, reportId, msg) => set({ status, isDone, reportId, statusMessage: msg }),

    startAnalysis: (videoId) => set({
        targetVideoId: videoId,
        status: "uploading", // 초기 상태 설정
        isDone: false
    }),

    resetAnalysis: () => set({
        targetVideoId: null,
        status: "idle",
        isDone: false,
        reportId: null,
        statusMessage: null
    }),
}));