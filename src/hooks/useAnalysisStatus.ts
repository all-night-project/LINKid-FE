import { useEffect, useState } from "react";
import axios from "axios";

interface AnalysisStatus {
    status: string;
    message: string;
    progress: number;
}

export const useAnalysisStatus = (analysisId: string | null) => {
    const [status, setStatus] = useState<AnalysisStatus | null>(null);

    useEffect(() => {
        if (!analysisId) return;

        const fetchStatus = async () => {
            try {
                const { data } = await axios.get(``)  // api
                setStatus(data);
            } catch (err) {
                console.error("분석 상태 불러오기 실패: ", err);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 3000);

        return () => clearInterval(interval);
    }, [analysisId]);

    return status;
};