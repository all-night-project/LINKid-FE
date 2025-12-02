import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAnalysisStore } from "../../store/useAnalysisStore";
import { useVideoStatusPolling } from "../../utils/useVideoStatusPolling";

// 1. 폴링 훅을 여기서 호출 (이 컴포넌트는 항상 렌더링 된다고 가정)
// 분석 중이 아니면 훅 내부에서 알아서 아무것도 안함.

const FloatingAnalysisButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Store에서 상태 가져오기
    const { targetVideoId, isDone, resetAnalysis, reportId, progress } = useAnalysisStore();

    // 폴링 실행 (전역적으로 상태 감시)
    useVideoStatusPolling();

    // 2. 버튼을 보여주지 말아야 할 조건 체크
    // 분석 중인 비디오가 없거나(idle), 현재 분석 페이지에 있거나, 리포트 페이지에 있다면 숨김
    const isAnalysisPage = location.pathname.includes('/analysis');

    const pathSegments = location.pathname.split('/');
    const reportIndex = pathSegments.indexOf('report');

    const viewingReportId = (reportIndex !== -1 && pathSegments[reportIndex + 1])
        ? Number(pathSegments[reportIndex + 1])
        : null;

    const isViewingResult = isDone && reportId && (viewingReportId === reportId);

    useEffect(() => {
        if (isViewingResult) {
            resetAnalysis();
        }
    }, [isViewingResult, resetAnalysis]);

    if (isAnalysisPage || isViewingResult) return null;
    if (!targetVideoId && !isDone) return null;  // 분석 중이거나 완료된 상태라면 버튼이 보임.

    const displayProgress = progress ?? 0;

    const handleClick = () => {
        if (isDone && reportId) {
            // 완료 체크 클릭 시 -> 리포트 페이지로 이동
            navigate(`/report/${reportId}/step/1`);
            resetAnalysis();
        } else if (targetVideoId) {
            navigate(`/analysis/${targetVideoId}`);
        }
    };

    return (
        <FloatingWrapper onClick={handleClick} $done={isDone}>
            {isDone ? (
                // 완료 시: 체크 아이콘
                <CheckIcon>✓</CheckIcon>
            ) : (
                // 분석 중: 스피너 링
                <>
                    <SpinnerRing />
                    <ProgressText>
                        {displayProgress}
                        <span>%</span>
                    </ProgressText>
                </>
            )}
        </FloatingWrapper>
    );
};

export default FloatingAnalysisButton;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const popIn = keyframes`
  0% { transform: scale(0); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

// 버튼의 틀 (위치 및 배경 담당)
const FloatingWrapper = styled.div<{ $done: boolean }>`
    position: absolute; 
    right: 20px; 
    bottom: 110px; 
    width: 60px; 
    height: 60px;

    background: ${({ $done, theme }) => ($done ? theme.colors.primary[500] : "white")};
    border-radius: 50%;
    
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const SpinnerRing = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    
    border: 5px solid #f0f0f0;
    border-top: 5px solid ${({ theme }) => theme.colors.primary[500]};
    
    animation: ${spin} 1s linear infinite;
    box-sizing: border-box; 
`;

const ProgressText = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    
    font-size: 2rem; 
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary[500]};

    span {
        font-size: 1rem;
        margin-top: 2px;
        font-weight: normal;
    }
`;

// 완료 체크 아이콘
const CheckIcon = styled.span`
    color: white;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
    
    // 완료될 때 팝! 하고 나타나는 효과
    animation: ${popIn} 0.4s ease-out forwards;
`;