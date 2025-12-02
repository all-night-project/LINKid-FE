import { create } from "zustand";

interface AnalysisState {
    status: string;
    statusMessage: string | null;
    isDone: boolean;
    reportId: number | null;
    targetVideoId: number | null;
    updateStatus: (status: string, isDone: boolean, reportId: number | null, msg: string | null) => void;
    startAnalysis: (videoId: number) => void;
    resetAnalysis: () => void;

    progress: number | null;
    setProgress: (progress: number) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
    status: "idle",
    statusMessage: null,
    isDone: false,
    reportId: null,
    targetVideoId: null,
    progress: 0,
    setProgress: (progress) => set({ progress }),

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
        statusMessage: null,
        progress: 0
    }),
}));