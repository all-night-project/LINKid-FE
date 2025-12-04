import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";
import CheckIcon from "../../assets/icons/check_circle.svg?react";
import MessageIcon from "../../assets/icons/message-thin.svg?react";
import CompleteModal from "../common/CompleteModal";

import type { ChallengeAction } from "../../types/challenge";

interface PracticeListProps {
    practices: ChallengeAction[];
    onRefresh: () => void;
}

const PracticeListSection = ({ practices, onRefresh }: PracticeListProps) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedActionId, setSelectedActionId] = useState<number | null>(null);

    const handleOpenModal = (actionId: number) => {
        setSelectedActionId(actionId);
        setOpenModal(true);
    };

    return (
        <Wrapper>
            <SectionTitle>실천 목록</SectionTitle>

            {practices.map((p, index) => (
                <PracticeItem key={p.actionId}>
                    <Row completed={p.completed}>
                        <LeftBox>
                            <Number>{index + 1}.</Number>
                            <TextBox>
                                <Label>{p.content}</Label>
                                {p.completed && (
                                    <Date>{p.completedDate ?? ""}</Date>
                                )}
                            </TextBox>
                        </LeftBox>

                        {p.completed ? (
                            <CheckIcon width={28} height={28} />
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => handleOpenModal(p.actionId)}
                            >
                                완료하기
                            </Button>
                        )}
                    </Row>

                    {/* 회고가 있을 때만 표시 */}
                    {p.completed && (
                        <Review>
                            <Icon>
                                <MessageIcon />
                            </Icon>
                            <ReviewTextBox>
                                <ReviewTitle>나의 회고</ReviewTitle>
                                {p.reflection ? (
                                    <ReviewText>{p.reflection}</ReviewText>

                                ) : (
                                    <EmptyText>작성된 회고가 없어요!</EmptyText>
                                )}
                            </ReviewTextBox>
                        </Review>
                    )}
                </PracticeItem>
            ))}
            <CompleteModal
                open={openModal}
                actionId={selectedActionId ?? 0}
                onClose={() => setOpenModal(false)}
                onCompleted={() => {
                    onRefresh();  // 🔥 상위에서 refresh 호출
                    setOpenModal(false);
                }}
            />
        </Wrapper>
    );
};

export default PracticeListSection;

const Wrapper = styled.div`
    width: 100%;
    background: white;
    padding: 18px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SectionTitle = styled.p`
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    font-size: 2rem;
    margin-bottom: 5px;
`;

const PracticeItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Row = styled.div<{ completed: boolean }>`
    background: ${({ completed, theme }) => (completed ? "white" : theme.colors.gray[200])};
    border: ${({ completed }) => (
        completed ? "1px solid #F4C2C2" : "1.5px solid #F1EDEC"
    )};
    padding: 14px 18px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > svg path {
        fill: ${({ theme }) => theme.colors.primary[600]};
    }

    > Button {
        width: 58px;
        height: 25px;
        font-size: 1.3rem;
        box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
        flex-shrink: 0;
    }
`;

const LeftBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Number = styled.span`
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const TextBox = styled.p`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    /* max-width: 230px;    */
    word-break: keep-all;
    white-space: normal;
    line-height: 1.3;
`;

const Date = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Review = styled.div`
    padding: 10px 14px;
    display: flex;
    gap: 11px;
    background: ${({ theme }) => theme.colors.primary[200]};
    border-radius: 5px;
`;

const ReviewTextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
`;

const ReviewTitle = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const ReviewText = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.3;
`;

const Icon = styled.div`
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const EmptyText = styled.p`
    font-size: 1.3rem;
    line-height: 1.3;
`;