import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { mergePracticeData } from "../../utils/challenge";
import TrophyIcon from "../../assets/icons/trophy.svg?react";
import CompletedPracticeSection from "./CompletedPracticeSection";
import Button from "../common/Button";

const ChallengeCompletedView = ({ challengeId }) => {
    const rawChallenge = {
        challengeId: 3,
        title: "인내심 기르기 챌린지",
        how: "즉시 긍정적으로 반응하고 성취감을 인정해주세요.",
        period: "9월 10일 ~ 9월 17일",
        status: "COMPLETED",
        sourceReportId: 122,
        description: "아이가 성과를 공유할 때 즉시 공감하며 반응하기",
        targetCount: 3,

        strategyGuide: {
            examples: [
                "우와, 이걸 혼자서 다 만들었구나!",
                "오, 정말 멋진 작품이네!",
                "와, 노력한 게 눈에 보여!"
            ]
        },

        practiceLogs: [
            {
                logId: 101,
                memo: "오늘 아이가 그림 그린 것 자랑할 때 바로 칭찬해줬다!",
                createdAt: "2025-01-16T10:00:00Z"
            },
            {
                logId: 102,
                memo: "블록 쌓은 것 봐달라고 할 때 '잠깐만'이라고 해서 놓쳤다. 내일은 꼭 바로 반응해야지.",
                createdAt: "2025-01-17T18:30:00Z"
            },
            {
                logId: 103,
                memo: "블록 쌓은 것 봐달라고 할 때 '잠깐만'이라고 해서 놓쳤다. 내일은 꼭 바로 반응해야지.",
                createdAt: "2025-01-18T18:30:00Z"
            }
        ],

        currentCount: 3
    };

    const practices = mergePracticeData(
        rawChallenge.strategyGuide,
        rawChallenge.practiceLogs,
        rawChallenge.targetCount
    );

    const percent = Math.round((rawChallenge.currentCount / rawChallenge.targetCount) * 100);

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Icon><TrophyIcon /></Icon>
                <Title>{rawChallenge.title}</Title>
                <How>{rawChallenge.how}</How>
                <Achievement>달성률 {percent}%</Achievement>
            </Header>

            <CompletedPracticeSection
                practices={practices}
            />

            <Button
                onClick={() => navigate(`/report/${rawChallenge.sourceReportId}`)}
            >관련 분석 보러가기</Button>

        </Wrapper>
    )

};

export default ChallengeCompletedView;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    > Button {
        height: 47px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    background: ${({ theme }) => theme.colors.primary[400]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;

    > svg path {
        fill: ${({ theme }) => theme.colors.primary[600]};
    }
`

const Title = styled.h2`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    margin-bottom: 15px;
`;

const How = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 10px;
`

const Achievement = styled.p`
    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.navy};
    background: rgba(107, 123, 201, 0.5);
    padding: 6px 20px;
    border-radius: 5px;
`;