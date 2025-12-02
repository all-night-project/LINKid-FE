import styled from "styled-components";
import { useState } from "react";
import Button from "../common/Button";

interface EditChildModalProps {
    open: boolean;
    onClose: () => void;
    child: {
        childId: number;
        name: string;
        birthdate: string;
        gender: string;
    };
    onSave: (data: { name: string; birth: string; gender: string }) => void;
}

const EditChildModal = ({ open, onClose, child, onSave }: EditChildModalProps) => {
    if (!open) return null;

    const [name, setName] = useState(child.name);
    const [birth, setBirth] = useState(child.birthdate);
    const [gender, setGender] = useState(child.gender);

    return (
        <Backdrop onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>아이 정보 수정</Title>

                <Label>이름</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />

                <Label>생년월일</Label>
                <Input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} />

                <Label>성별</Label>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="여아">여아</option>
                    <option value="남아">남아</option>
                    <option value="기타">기타</option>
                </Select>

                <ButtonRow>
                    <Button variant="gray" onClick={onClose}>취소</Button>
                    <Button
                        variant="primary"
                        onClick={() => onSave({ name, birth, gender })}
                    >
                        저장하기
                    </Button>
                </ButtonRow>
            </Modal>
        </Backdrop>
    );
};

export default EditChildModal;


/* --- styled components --- */

const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const Modal = styled.div`
    width: 90%;
    max-width: 360px;
    background: white;
    border-radius: 16px;
    padding: 24px 20px;
`;

const Title = styled.h2`
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    margin-bottom: 20px;
    text-align: center;
`;

const Label = styled.p`
    font-size: 1.5rem;
    margin: 10px 5px 6px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    border: 1.5px solid ${({ theme }) => theme.colors.gray[500]};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-family: ${({ theme }) => theme.typography.fontFamily};
        opacity: 1;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1.5px solid ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.textPrimary};
    /* 기본 화살표 제거 */
    appearance: none;
    -webkit-appearance: none;

    /* 커스텀 화살표 추가 */
    background-image: url('/down-arrow.svg');  
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: right 12px center;
`;

const ButtonRow = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 12px;

    > Button {
        height: 40px;
        font-weight: ${({ theme }) => theme.typography.weights.semibold};
    }
`;