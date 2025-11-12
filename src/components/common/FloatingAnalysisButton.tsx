import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface AnalysisData {
    status: "analyzing" | "done";
    id: string;
    title: string;
}

const FloatingAnalysisButton = () => {
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);

    // localStorage에서 상태 복원
    useEffect(() => {
        const saved = localStorage.getItem("current_analysis");
        if (saved) setAnalysis(JSON.parse(saved));
    }, []);

    // 현재 페이지가 /analyze면 버튼 숨기기
    if (location.pathname.startsWith("/analyze")) {
        return null;
    }

    // 분석 진행 중이거나 완료된 경우만 표시
    if (!analysis) return null;

    const handleClick = () => {
        if (analysis.status === "analyzing") {
            navigate("/analysis");
        } else {
            navigate(`/report/${analysis.id}/step`)
        }
    };

    return (
        <FloatingButton
            $status={analysis.status}
            onClick={handleClick}
            title={
                analysis.status === "analyzing"
                    ? "영상 분석 중입니다"
                    : "분석 결과 보기"
            }
        >
            {analysis.status === "analyzing" ? "🎧" : "✅"}
        </FloatingButton>
    );
};

export default FloatingAnalysisButton;

const FloatingButton = styled.button<{ $status: "analyzing" | "done" }>`
    position: fixed;
    bottom: 90px; /* Footer 위 */
    right: 20px;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-size: 28px;

    background-color: ${({ $status, theme }) =>
        $status === "analyzing"
            ? theme.colors.primary[500]
            : theme.colors.secondary[500]};
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
        opacity: 0.9;
  }
`;