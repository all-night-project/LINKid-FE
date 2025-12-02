import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/common/Spinner";
import AnalyzeInfoCarousel from "../components/video/AnalyzeInfoCarousel";
import AichipIcon from "../assets/icons/ai-chip.svg?react";
import CoachingIcon from "../assets/icons/coaching.svg?react";
import YardIcon from "../assets/icons/yard.svg?react";
import ExpertIcon from "../assets/icons/expert.svg?react";

import { useAnalysisStore } from "../store/useAnalysisStore";

const infoItems = [
    {
        id: 1,
        icon: <AichipIcon />,
        title: "부모와 아이의 목소리를 분리해요",
        description:
            "부모님과 아이의 음성을 자동으로 구분합니다. 누가 어떤 말을 했는지 명확히 구별해 더욱 정확한 분석이 가능해요.",
    },
    {
        id: 2,
        icon: <ExpertIcon />,
        title: "전문가들의 기준으로 행동 유형을 분류해요",
        description:
            "부모·아동 상호작용 평가에 실제로 사용되는 행동 분류 체계를 기반으로 칭찬, 반영적 듣기, 지시, 질문, 부정적 피드백 등으로 분류합니다.",
    },
    {
        id: 3,
        icon: <YardIcon />,
        title: "상호작용 지표를 수치화해 계산해요",
        description:
            "긍정/지시 비율(PI/NDI), 질문 응답률 등 전문가가 리포트에서 제공하는 핵심 지표들을 수치화합니다.",
    },
    {
        id: 4,
        icon: <CoachingIcon />,
        title: "맞춤형 챌린지를 추천해요",
        description:
            "분석된 데이터를 기반으로 부모님 스타일과 아이의 반응 패턴을 해석하고 실제 전문가들의 전략을 참고해 실천 챌린지와 맞춤형 코칭 문구를 생성합니다.",
    },
];

const AnalysisPage = () => {
    const navigate = useNavigate();
    const { videoId } = useParams<{ videoId: string }>();

    const { status, statusMessage, isDone, reportId, progress } = useAnalysisStore();

    const displayProgress = progress ?? 0;

    // 분석 완료되면 report/{reportId}/step/1으로 이동
    useEffect(() => {
        if (isDone && reportId) {
            // 사용자가 완료 메시지를 볼 수 있도록 약간의 지연 후 이동
            const timer = setTimeout(() => {
                navigate(`/report/${reportId}/step/1`);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isDone, reportId, navigate]);


    if (!status) {
        return (
            <Container>
                <Spinner size={80} color="#F4C2C2" borderWidth={10} />
                <StatusText>분석 상태를 불러오는 중...</StatusText>
                <AnalyzeInfoCarousel items={infoItems} />
            </Container>
        )
    }

    return (
        <Container>
            <SpinnerWrapper>
                <Spinner size={80} color="#F4C2C2" borderWidth={10} />
                <ProgressOverlay>
                    {displayProgress}<span>%</span>
                </ProgressOverlay>
            </SpinnerWrapper>
            <StatusText>{statusMessage}</StatusText>
            <SubText>잠시 다른 페이지를 다녀오셔도 분석은 계속됩니다.</SubText>
            <AnalyzeInfoCarousel items={infoItems} />
        </Container>
    );
};

export default AnalysisPage;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SpinnerWrapper = styled.div`
    position: relative;
    width: 80px;  /* Spinner size와 동일하게 */
    height: 80px; /* Spinner size와 동일하게 */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px; /* 기존 Spinner의 margin 처리 */
`;

const ProgressOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    font-size: 2.3rem; 
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textPrimary}; // 테마색 또는 스피너 색상
    line-height: 1;

    span {
        font-size: 1.5rem;
        margin-top: 2px;
        font-weight: normal;
    }
`;

const StatusText = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-top: 20px;
`;

const SubText = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 8px;
    margin-bottom: 30px;
    text-align: center;
`;;