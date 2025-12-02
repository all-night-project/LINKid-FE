import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useAnalysisStore } from "../../store/useAnalysisStore";
import { useVideoStatusPolling } from "../../utils/useVideoStatusPolling";

// 1. 폴링 훅을 여기서 호출 (이 컴포넌트는 항상 렌더링 된다고 가정)
// 분석 중이 아니면 훅 내부에서 알아서 아무것도 안함.

const FloatingAnalysisButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Store에서 상태 가져오기
    const { targetVideoId, isDone, resetAnalysis, reportId } = useAnalysisStore();

    // 폴링 실행 (전역적으로 상태 감시)
    useVideoStatusPolling();

    // 2. 버튼을 보여주지 말아야 할 조건 체크
    // 분석 중인 비디오가 없거나(idle), 현재 분석 페이지에 있거나, 리포트 페이지에 있다면 숨김
    const isAnalysisPage = location.pathname.includes('/analysis');

    if (isAnalysisPage) return null; // 분석 페이지에서는 본문 내용이 있으므로 숨김
    if (!targetVideoId && !isDone) return null;  // 분석 중이거나 완료된 상태라면 버튼이 보임.

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
                <SpinnerRing />
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
    bottom: 90px; 
    width: 56px; 
    height: 56px;

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

// 로딩 스피너 (도넛 모양)
const SpinnerRing = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    
    // 테두리 두께 및 기본 색상 (연한 회색)
    border: 4px solid #f3f3f3;
    
    // 회전할 부분의 색상 (테마의 Primary 색상)
    border-top: 4px solid ${({ theme }) => theme.colors.primary[500]};
    
    // 애니메이션
    animation: ${spin} 1s linear infinite;
    
    // 버튼 크기에 딱 맞게 조절 (border가 박스 밖으로 안 나가게 box-sizing 처리 혹은 크기 조정)
    box-sizing: border-box; 
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