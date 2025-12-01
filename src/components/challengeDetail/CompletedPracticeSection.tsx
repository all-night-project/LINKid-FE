import styled from "styled-components";
import CheckIcon from "../../assets/icons/check_circle.svg?react";
import MessageIcon from "../../assets/icons/message-thin.svg?react";

import type { ChallengeAction } from "../../types/challenge";


interface CompletedPracticeSectionProps {
    practices: ChallengeAction[];
}

const CompletedPracticeSection = ({ practices }: CompletedPracticeSectionProps) => {
    return (
        <Wrapper>
            <SectionTitle>실천 목록</SectionTitle>

            {practices.map((p) => (
                <PracticeItem key={p.actionId}>
                    <Row>
                        <CheckIcon />
                        <Label>{p.content}</Label>
                    </Row>
                    <Date>{p.completedDate ?? ""}</Date>
                    <Review>
                        <Icon>
                            <MessageIcon />
                        </Icon>
                        {p.reflection ? (
                            <ReviewText>{p.reflection}</ReviewText>

                        ) : (
                            <EmptyText>작성된 회고가 없어요!</EmptyText>
                        )}
                    </Review>
                </PracticeItem>
            ))}
        </Wrapper>
    );
};

export default CompletedPracticeSection;

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
    background: ${({ theme }) => theme.colors.primary[200]};
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 5px;
    padding: 12px;
    gap: 5px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;

    > svg path {
        fill: ${({ theme }) => theme.colors.primary[600]};
    }
`;

const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    margin-right: 5px;
    max-width: 305px;
    line-height: 1.3;
`;

const Date = styled.p`
    margin-left: 30px;
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Review = styled.div`
    margin-left: 30px;
    padding: 10px 8px;
    display: flex;
    gap: 11px;
    background: white;
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    border-radius: 5px;
`;

const ReviewText = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.4;
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
        display: block;
    }
`;

const EmptyText = styled.p`
    font-size: 1.3rem;
    line-height: 1.3;
`;