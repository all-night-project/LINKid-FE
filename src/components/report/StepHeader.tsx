import styled from "styled-components";

const STEP_CONTENT: Record<number, {
    title: string;
    description: string;
    more: string;
}> = {
    1: {
        title: "오늘의 상호작용 진단",
        description: "{parentName}님과 아이의 상호작용 균형을\n한 눈에 확인해 보세요",
        more: "{parentName}님과 아이의 오늘 대화는 ‘{stageName}’ 단계에 가까웠어요",
    },
    2: {
        title: "AI가 포착한 핵심 순간",
        description: "오늘 아이와의 대화에서 가장 의미 있었던\n'순간'들을 모아봤어요",
        more: "데이터가 아닌, ‘순간'으로 대화를 돌아볼까요?",
    },
    3: {
        title: "상호작용 스타일 상세 분석",
        description: "부모님의 대화 패턴을\n9가지 전문 기준으로 자세히 살펴봤어요",
        more: "우리의 대화는 어떤 스타일인지 객관적인 데이터로 확인해 보세요",
    },
    4: {
        title: "AI 종합 코칭 및 실천 계획",
        description: "분석 결과를 바탕으로,\n{parentName}님을 위한 맞춤 팁과 챌린지를 제안해 드려요",
        more: "성장을 위한 다음 걸음, 'LINKid’가 함께할게요",
    },
    5: {
        title: "나의 성장 리포트",
        description: "지난 분석과 비교하여\n얼마나 긍정적인 변화가 있었는지 보여드릴게요!",
        more: "{parentName}님의 멋진 노력이 만들어낸 변화를 확인해 보세요",
    },
} as const;

function fillTemplate(template: string, values: Record<string, string>) {
    return template.replace(/{(.*?)}/g, (_, key) => values[key] ?? "");
}

interface StepHeaderProps {
    step: number;
    parentName: string;
    stageName: string;
}

const StepHeader = ({ step, parentName, stageName }: StepHeaderProps) => {
    const content = STEP_CONTENT[step];

    if (!content) return null;

    const filledTitle = fillTemplate(content.title, { parentName, stageName });
    const filledDesc = fillTemplate(content.description, { parentName, stageName });
    const filledMore = fillTemplate(content.more, { parentName, stageName });

    return (
        <HeaderArea>
            <Title>{filledTitle}</Title>
            <Description>{filledDesc}</Description>
            <More>{filledMore}</More>
        </HeaderArea>
    );
};

export default StepHeader;

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
    line-height: 1.3;
`;

const More = styled.p`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 50px;
`;