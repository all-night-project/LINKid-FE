import styled from "styled-components";
import { useAnalysisStatus } from "../../hooks/useAnalysisStatus";
import Spinner from "../../components/common/Spinner";
import AnalyzeInfoCarousel from "./components/AnalyzeInfoCarousel";
import AichipIcon from "../../assets/icons/ai-chip.svg?react";

const infoItems = [
    {
        id: 1,
        icon: <AichipIcon />,
        title: "AI는 어떤 방식으로 분석하나요?",
        description:
            "분석을 시도한 페이지에서 로딩 애니메이션 또는 분석 요약을 보여주며, 페이지 이탈을 제한합니다.",
    },
    {
        id: 2,
        icon: <AichipIcon />,
        title: "음성 분석 단계",
        description:
            "녹음된 음성에서 부모와 아이의 발화를 분리하고, 대화 패턴을 정량적으로 분석합니다.",
    },
    {
        id: 3,
        icon: <AichipIcon />,
        title: "영상 인식 단계",
        description:
            "영상 프레임을 기반으로 아이의 표정, 제스처, 움직임 등을 감지하여 상호작용의 질을 평가합니다.",
    },
];


interface AnalysisPageProps {
    analysisId: string;
}

const AnalysisPage = ({ analysisId }: AnalysisPageProps) => {
    const status = useAnalysisStatus(analysisId);

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
            <Spinner size={80} color="#F4C2C2" borderWidth={10} />
            <StatusText>{status.message}</StatusText>
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

const StatusText = styled.p`
    font-size: 20px;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-top: 20px;
`