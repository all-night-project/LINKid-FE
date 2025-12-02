import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getReportDetail } from "../api/report";

interface ReportStore {
    report: any | null;

    setReport: (data: any) => void;
    clearReport: () => void;

    fetchReport: (reportId: number) => Promise<void>;
}

export const useReportStore = create<ReportStore>()(
    persist(
        (set) => ({
            report: null,

            setReport: (report) => set({ report }),

            clearReport: () => set({ report: null }),

            fetchReport: async (reportId: number) => {
                try {
                    const data = await getReportDetail(reportId);

                    set({ report: data });
                } catch (error) {
                    console.error("리포트 불러오기 실패:", error);
                }
            },
        }),
        {
            name: "report-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);