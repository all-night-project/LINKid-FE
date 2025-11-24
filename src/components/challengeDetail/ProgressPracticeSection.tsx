import styled from "styled-components";
import type { PracticeItem } from "../../types/challenge";
import { formatDateString } from "../../utils/challenge";
import Button from "../common/Button";
import CheckIcon from "../../assets/icons/check_circle.svg?react";
import MessageIcon from "../../assets/icons/message-thin.svg?react";

interface PracticeListProps {
    practices: PracticeItem[];
    onClickComplete: (id: number) => void;
}

const PracticeListSection = ({ practices, onClickComplete }: PracticeListProps) => {
    return (
        <Wrapper>
            <SectionTitle>실천 목록</SectionTitle>

            {practices.map((p) => (
                <PracticeItem key={p.id}>
                    <Row completed={p.completed}>
                        <LeftBox>
                            <Number>{p.id}.</Number>
                            <TextBox>
                                <Label>{p.label}</Label>
                                {p.completed && (
                                    <Date>{p.createdAt ? formatDateString(p.createdAt) : ""}</Date>
                                )}
                            </TextBox>
                        </LeftBox>

                        {p.completed ? (
                            <CheckIcon width={28} height={28} />
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => onClickComplete(p.id)}
                            >
                                완료하기
                            </Button>
                        )}
                    </Row>

                    {/* 회고가 있을 때만 표시 */}
                    {p.review && (
                        <Review>
                            <Icon>
                                <MessageIcon />
                            </Icon>
                            <ReviewTextBox>
                                <ReviewTitle>나의 회고</ReviewTitle>
                                <ReviewText>{p.review}</ReviewText>
                            </ReviewTextBox>
                        </Review>
                    )}
                </PracticeItem>
            ))}
        </Wrapper>
    );
};

export default PracticeListSection;

const Wrapper = styled.div`
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
    min-width: 18px;
    min-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
    }
`;