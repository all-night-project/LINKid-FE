import styled from "styled-components";
import { useState, useEffect } from "react";
import CalendarIcon from "../../assets/icons/calender.svg?react";
import MessageIcon from "../../assets/icons/message-thin.svg?react";
import DatePicker from "react-datepicker";
import Button from "./Button";
import "react-datepicker/dist/react-datepicker.css";

import { submitMemo } from "../../api/challenge";

interface CompleteModalProps {
    open: boolean;
    onClose: () => void;
    actionId: number;
    onCompleted: (id: number) => void;
}

const CompleteModal = ({ open, onClose, actionId, onCompleted }: CompleteModalProps) => {
    if (!open) return null;

    console.log(`actionId: ${actionId}`);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [memo, setMemo] = useState("");
    const [loading, setLoading] = useState(false);

    // 모달이 열릴 때마다 오늘 날짜로 초기화
    useEffect(() => {
        if (open) {
            setSelectedDate(new Date());
            setMemo("");
        }
    }, [open]);


    const handleSubmit = async () => {
        if (!actionId) console.log("action없음");

        try {
            setLoading(true);

            await submitMemo(actionId, memo);
            onCompleted(actionId);
            onClose(); // 닫기
        } catch (err) {
            console.error("회고 제출 실패", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Backdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalTitle>실천 완료 기록</ModalTitle>
                <ModalSubtitle>
                    실천한 날짜와 회고를 작성해보세요
                </ModalSubtitle>

                {/* 날짜 입력 */}
                <FieldGroup>
                    <FieldLabel>
                        <CalendarIcon />
                        실천한 날짜
                    </FieldLabel>

                    <DatePickerWrapper>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date: Date | null) => {
                                if (date) setSelectedDate(date);
                            }}
                            dateFormat="yyyy.MM.dd"
                            maxDate={new Date()}
                        />
                    </DatePickerWrapper>
                </FieldGroup>

                {/* 회고 입력 */}
                <FieldGroup>
                    <FieldLabel>
                        <MessageIcon width={18} height={18} />
                        <span>오늘의 회고</span>
                    </FieldLabel>

                    <TextArea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder={`실천한 경험과 느낀 점을 자유롭게 작성해주세요.\n\n예: 처음에는 어색했지만 점점 자연스러워지는 것 같아요.`}
                    />
                </FieldGroup>

                {/* 버튼 두 개 */}
                <ButtonRow>
                    <Button
                        onClick={onClose}
                        variant="gray"
                    >취소</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="primary"
                    >완료 기록하기</Button>
                </ButtonRow>
            </ModalContainer>
        </Backdrop >
    );
};

export default CompleteModal;

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const ModalContainer = styled.div`
    width: 90%;
    max-width: 360px;
    background: white;
    border-radius: 16px;
    padding: 24px 20px;
`;

const ModalTitle = styled.h2`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    text-align: center;
    margin-bottom: 10px;
`;

const ModalSubtitle = styled.p`
    text-align: center;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    margin-bottom: 24px;
`;

const FieldGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const FieldLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
    margin-left: 4px;
`;

const DatePickerWrapper = styled.div`
    width: 100%;

    .react-datepicker-wrapper {
        width: 100%;
    }

    input {
        width: 100%;
        padding: 14px;
        border: 1.5px solid ${({ theme }) => theme.colors.gray[500]};
        border-radius: 8px;
        font-size: 1.5rem;
        background: white;
        color: ${({ theme }) => theme.colors.textPrimary};

        /* iOS 대응 */
        -webkit-appearance: none;
        appearance: none;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 120px;
    border-radius: 10px;
    padding: 10px 14px;
    border: 1.5px solid ${({ theme }) => theme.colors.gray[500]};
    font-size: 1.3rem;
    resize: none;
    outline: none;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.textPrimary};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-family: ${({ theme }) => theme.typography.fontFamily};
        opacity: 1;
    }

    /* Chrome, Safari */
    &::-webkit-scrollbar {
        display: none;
    }

    /* Firefox */
    scrollbar-width: none;

    /* IE, Edge */
    -ms-overflow-style: none;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 10px;
    
    > Button {
        height: 40px;
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
    }
`;