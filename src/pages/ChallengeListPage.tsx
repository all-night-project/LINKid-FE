import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PercentBar from "../components/common/PercentBar";
import CheckIcon from "../assets/icons/check_circle.svg?react";
import CancelIcon from "../assets/icons/cancel.svg?react";
import EllipseIcon from "../assets/icons/ellipse.svg?react";
import Button from "../components/common/Button";

import { getMyChallenge } from "../api/challenge";
import type { Challenge } from "../types/challenge";

const ChallengeListPage = () => {
    const navigate = useNavigate();

    const [tab, setTab] = useState<"ACTIVE" | "COMPLETED">("ACTIVE");
    const [activeList, setActiveList] = useState<Challenge[]>([]);
    const [completedList, setCompletedList] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    // 페이지 진입 시 두 개 API 모두 불러오기
    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [active, completed] = await Promise.all([
                    getMyChallenge("ACTIVE"),
                    getMyChallenge("COMPLETED"),
                ]);

                setActiveList(active);
                setCompletedList(completed);
            } catch (err) {
                console.error("챌린지 불러오기 실패", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const challenges = tab === "ACTIVE" ? activeList : completedList;

    const goToDetail = (c: Challenge) => {
        const status = c.status === "COMPLETED" ? "COMPLETED" : "ACTIVE";
        navigate(`/challenge/${c.challengeId}`, {
            state: { status }
        });
    };


    return (
        <Wrapper>
            <TabContainer>
                <TabButton
                    $active={tab === "ACTIVE"}
                    onClick={() => setTab("ACTIVE")}
                >
                    진행 중
                </TabButton>
                <TabButton
                    $active={tab === "COMPLETED"}
                    onClick={() => setTab("COMPLETED")}
                >
                    진행 완료
                </TabButton>
            </TabContainer>

            {/* 로딩 스켈레톤 */}
            {loading && <div></div>}

            <ListWrapper>
                {tab === "ACTIVE" && (
                    activeList.length === 0 ? (
                        <EmptyState>
                            <EmptyText>아직 진행 중인 챌린지가 없어요.</EmptyText>
                            <SubText>아이와의 상호작용을 분석하고 챌린지를 만들어보세요!</SubText>

                            <Button
                                variant="primary"
                                onClick={() => navigate("/upload")}
                            >
                                분석하러 가기
                            </Button>
                        </EmptyState>
                    ) : (
                        activeList.map((c) => (
                            <ProgressCard key={c.challengeId} onClick={() => goToDetail(c)}>
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
                                    label="진행 현황"
                                    value={c.progressPercent}
                                    variant="pink"
                                    gap="10px"
                                />
                            </ProgressCard>
                        ))
                    )
                )}

                {tab === "COMPLETED" &&
                    completedList.length === 0 ? (
                    <EmptyState>
                        <EmptyText>아직 완료된 챌린지가 없어요.</EmptyText>
                        <SubText>도전한 챌린지를 끝까지 실천해보세요!</SubText>
                    </EmptyState>
                ) : (
                    completedList.map((c) => {
                        const isSuccess = c.progressPercent >= 100;

                        return (
                            <DoneCard key={c.challengeId} onClick={() => goToDetail(c)}>
                                <InfoArea>
                                    <TitleText>{c.title}</TitleText>
                                    <Period>{c.period}</Period>
                                </InfoArea>

                                <RightArea>
                                    {isSuccess ? (
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
                        );
                    })
                )}
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
    width: 90px;
    flex-shrink: 0;
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
`;

const EmptyState = styled.div`
    width: 100%;
    padding: 80px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    > Button {
        width: 70%;
    }
`;

const EmptyText = styled.p`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.bold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubText = styled.p`
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 260px;
    line-height: 1.4;
    word-break: keep-all;
`;