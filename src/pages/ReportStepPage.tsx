import { useParams, useNavigate } from "react-router-dom";
import { useReport } from "../api/useReport";
import styled from "styled-components";
import Button from "../components/common/Button";
import ReportStep1 from "../components/report/ReportStep1";
import ReportStep2 from "../components/report/ReportStep2";
import ReportStep3 from "../components/report/ReportStep3";
import ReportStep4 from "../components/report/ReportStep4";
import ReportStep5 from "../components/report/ReportStep5";

const STEP_CONTENT = {
    1: {
        title: "오늘의 상호작용 진단",
        description: "먼저, 두 분의 상호작용 균형을 한 눈에 확인해 보세요",
        more: "길동님과 아이의 오늘 대화는 ‘공감적 협력' 단계에 가까웠어요",
    },
    2: {
        title: "AI가 포착한 핵심 순간",
        description: "오늘 대화에서 가장 의미 있었던\n'순간'들을 모아봤어요",
        more: "데이터가 아닌, ‘순간'으로 대화를 돌아볼까요?",
    },
    3: {
        title: "상호작용 스타일 상세 분석",
        description: "부모님의 대화 패턴을\n9가지 전문 기준으로 자세히 살펴봤어요",
        more: "우리의 대화는 어떤 스타일인지 객관적인 데이터로 확인해 보세요",
    },
    4: {
        title: "AI 종합 코칭 및 실천 계획",
        description: "분석 결과를 바탕으로,\n부모님을 위한 맞춤 팁과 챌린지를 제안해 드려요",
        more: "성장을 위한 다음 걸음, 'LINKid’가 함께할게요",
    },
    5: {
        title: "나의 성장 리포트",
        description: "지난 분석과 비교하여\n얼마나 긍정적인 변화가 있었는지 보여드릴게요!",
        more: "부모님의 멋진 노력이 만들어낸 변화를 확인해 보세요",
    },
} as const;

type StepKey = keyof typeof STEP_CONTENT;

const ReportStepPage = () => {
    const { reportId, step } = useParams<{ reportId: string, step: string }>();
    const navigate = useNavigate();

    if (!reportId) {
        return <Message>잘못된 접근입니다.</Message>;
    }

    const { report, loading } = useReport(reportId);

    const stepNumber = Number(step);

    if (!(stepNumber in STEP_CONTENT) || !reportId) {
        return <div>잘못된 접근입니다.</div>;
    }

    const content = STEP_CONTENT[stepNumber as StepKey];

    if (loading) return <Message>메시지 불러오는 중..</Message>;
    if (!report) return <Message>리포트를 찾을 수 없습니다.</Message>;

    // 유효하지 않은 step
    if (stepNumber < 1 || stepNumber > 5) {
        return <Message>잘못된 접근입니다.</Message>;
    }

    const handleNextStep = () => {
        navigate(`/report/${reportId}/step/${stepNumber + 1}`);
    };

    return (
        <Container>
            <HeaderArea>
                <Title>{content.title}</Title>
                <Description>{content.description}</Description>
                <More>{content.more}</More>
            </HeaderArea>

            <StepArea>
                {stepNumber === 1 && <ReportStep1 dashboard={report.dashboard} />}
                {stepNumber === 2 && <ReportStep2 keyMoments={report.content.keyMoments} />}
                {stepNumber === 3 && <ReportStep3 styleAnalysis={report.content.styleAnalysis} />}
                {stepNumber === 4 && <ReportStep4 coaching={report.content.coaching} />}
                {stepNumber === 5 && <ReportStep5 growthReport={report.content.growthReport} />}
            </StepArea>

            <ButtonWrapper>
                {stepNumber < 5 && (
                    <Button
                        variant="primary"
                        onClick={handleNextStep}
                    >다음으로</Button>
                )}
                {stepNumber === 5 && (
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/report/${reportId}`)}
                    >모든 분석 한눈에 보기</Button>
                )}
            </ButtonWrapper>
        </Container>
    );
};

export default ReportStepPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 67px 0;
`;

const HeaderArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1.8rem;
    margin-bottom: 7px;
    white-space: pre-line;
    text-align: center;
`;

const More = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 50px;
`;

const StepArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    margin-top: 50px;
    width: 60%;
`;

const Message = styled.p`
    margin-top: 40px;
    text-align: center;
`;