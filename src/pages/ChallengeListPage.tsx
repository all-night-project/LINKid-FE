import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PercentBar from "../components/common/PercentBar";
import CheckIcon from "../assets/icons/check_circle.svg?react";
import CancelIcon from "../assets/icons/cancel.svg?react";
import EllipseIcon from "../assets/icons/ellipse.svg?react";

const ChallengeListPage = () => {
    const [tab, setTab] = useState<"active" | "completed">("active");
    const navigate = useNavigate();

    const goToDetail = (c) => {
        // 진행 중(challenge) → status=active
        // 완료된(challenge) → status=completed
        const status = c.result ? "completed" : "active";
        navigate(`/challenge/${c.id}?status=${status}`);
    };

    // Mock data
    const progressingChallenges = [
        {
            id: 1,
            title: "인내심 기르기 챌린지",
            period: "9월 10일 ~ 9월 17일",
            mainMetric: "긍정 발화",
            percent: 70,
        },
        {
            id: 2,
            title: "인내심 기르기 챌린지",
            period: "9월 10일 ~ 9월 17일",
            mainMetric: "긍정 발화",
            percent: 70,
        },
    ];

    const doneChallenges = [
        {
            id: 3,
            title: "물기보다 공감하기",
            period: "9월 10일 ~ 9월 17일",
            result: "success",
        },
        {
            id: 4,
            title: "말하기 전에 경청하기",
            period: "9월 10일 ~ 9월 17일",
            result: "fail",
        },
        {
            id: 5,
            title: "말하기 전에 경청하기",
            period: "9월 10일 ~ 9월 17일",
            result: "fail",
        },
    ];

    return (
        <Wrapper>
            <TabContainer>
                <TabButton
                    $active={tab === "active"}
                    onClick={() => setTab("active")}
                >
                    진행 중
                </TabButton>
                <TabButton
                    $active={tab === "completed"}
                    onClick={() => setTab("completed")}
                >
                    진행 완료
                </TabButton>
            </TabContainer>

            <ListWrapper>
                {tab === "active" &&
                    progressingChallenges.map((c) => (
                        <ProgressCard key={c.id} onClick={() => goToDetail(c)}>
                            <Top>
                                <InfoArea>
                                    <TitleText>{c.title}</TitleText>
                                    <Period>{c.period}</Period>
                                </InfoArea>
                                <RightArea>
                                    <StatusBlue>진행 중</StatusBlue>
                                    <EllipseIcon />
                                </RightArea>
                            </Top>

                            <PercentBar
                                label={c.mainMetric}
                                value={c.percent}
                                variant="pink"
                                gap="10px"
                            />
                        </ProgressCard>
                    ))}

                {tab === "completed" &&
                    doneChallenges.map((c) => (
                        <DoneCard key={c.id} onClick={() => goToDetail(c)}>
                            <InfoArea>
                                <TitleText>{c.title}</TitleText>
                                <Period>{c.period}</Period>
                            </InfoArea>

                            <RightArea>
                                {c.result === "success" ? (
                                    <StatusSuccess>
                                        <SuccessText>성공</SuccessText>
                                        <CheckIcon width={35} height={35} />
                                    </StatusSuccess>
                                ) : (
                                    <StatusFail>
                                        <FailText>실패</FailText>
                                        <CancelIcon width={35} height={35} />
                                    </StatusFail>
                                )}
                            </RightArea>
                        </DoneCard>
                    ))}
            </ListWrapper>
        </Wrapper>
    );
};

export default ChallengeListPage;

const Wrapper = styled.div`
    width: 100%;
`;

const TabContainer = styled.div`
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding: 4px 5px;
    border-radius: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
`;

const TabButton = styled.button<{ $active: boolean }>`
    width: 50%;
    padding: 10px 0;
    border: none;
    border-radius: 15px;
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;

    background-color: ${({ $active, theme }) =>
        $active ? theme.colors.primary[500] : "white"};

    color: ${({ $active, theme }) =>
        $active ? "#fff" : theme.colors.textSecondary};

    &:active {
        background: #e5e5e5;
    }
`;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

/* 진행 중 카드 */
const ProgressCard = styled.div`
    background: white;
    padding: 25px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;    
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const InfoArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TitleText = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const Period = styled.p`
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const RightArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const StatusBlue = styled.span`
    color: ${({ theme }) => theme.colors.navy};
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: 1.8rem;
`;

/* 완료 카드 */
const DoneCard = styled.div`
    background: white;
    padding: 26px 16px;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`;

const StatusSuccess = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    > svg path {
        fill: ${({ theme }) => theme.colors.secondary[600]};
    }
`;

const SuccessText = styled.p`
    color: ${({ theme }) => theme.colors.secondary[600]};
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const StatusFail = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;

    > svg path {
        fill: #B03A3A;
    }
`;

const FailText = styled.p`
    color: #B03A3A;
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`