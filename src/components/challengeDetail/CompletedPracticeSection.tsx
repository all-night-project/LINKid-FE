import styled from "styled-components";
import type { PracticeItem } from "../../types/challenge";
import { formatDateString } from "../../utils/challenge";
import CheckIcon from "../../assets/icons/check_circle.svg?react";
import MessageIcon from "../../assets/icons/message-thin.svg?react";

interface PracticeListProps {
    practices: PracticeItem[];
}

const CompletedPracticeSection = ({ practices }: PracticeListProps) => {
    return (
        <Wrapper>
            <SectionTitle>실천 목록</SectionTitle>

            {practices.map((p) => (
                <PracticeItem key={p.id}>
                    <Row>
                        <CheckIcon />
                        <Label>{p.label}</Label>
                        <Date>{p.createdAt ? formatDateString(p.createdAt) : ""}</Date>
                    </Row>

                    <Review>
                        <Icon>
                            <MessageIcon />
                        </Icon>
                        <ReviewText>{p.review}</ReviewText>
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
    gap: 5px;

    > svg path {
        fill: ${({ theme }) => theme.colors.primary[600]};
    }
`;

const Label = styled.p`
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    margin-right: 5px;
`;

const Date = styled.p`
    font-size: 1.3rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const Review = styled.div`
    margin-left: 25px;
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
    min-width: 18px;
    min-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
        display: block;
    }
`;