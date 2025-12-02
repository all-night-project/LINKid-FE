import { useEffect } from "react";
import { videoStatus } from "../api/video";
import { useReportStore } from "../store/useReportStore";
import { useAnalysisStore } from "../store/useAnalysisStore";

export const useVideoStatusPolling = () => {
    const { setReport } = useReportStore();
    // store에서 targetVideoId를 가져옴
    const { targetVideoId, updateStatus, isDone } = useAnalysisStore();

    useEffect(() => {
        // 분석할 비디오가 없거나 이미 완료되었으면 폴링하지 않음
        if (!targetVideoId || isDone) return;

        const interval = setInterval(async () => {
            try {
                const res = await videoStatus(targetVideoId);
                const data = res.data;

                const completed = data.status === "COMPLETED";

                updateStatus(
                    data.status,
                    completed,
                    data.reportId ?? null,
                    data.message ?? null
                );

                if (completed) {
                    if (data.result) setReport(data.result);
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("분석 상태 조회 실패", err);
            }
        }, 2500);

        return () => clearInterval(interval);
    }, [targetVideoId, isDone, updateStatus, setReport]);
};