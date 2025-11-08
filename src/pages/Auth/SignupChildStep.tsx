import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import AccountIcon from "../../assets/icons/accounts.svg?react";
import CheckIcon from "../../assets/icons/check_circle.svg?react";
import CounterIcon2 from "../../assets/icons/counter_2.svg?react";
import MaleIcon from "../../assets/icons/male.svg?react";
import FemaleIcon from "../../assets/icons/female.svg?react";
import { ROUTES } from "../../router/routes";

const RedIcon = styled(CounterIcon2)`
  path {
    fill: #F87171;
  }
`;

const SignupChildStep = ({ formData, setFormData, prevStep }: any) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        childName: "",
        birth: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const [selectedGender, setSelectedGender] = useState<"M" | "F" | null>(null);

    const handleSubmit = () => {
        const newErrors: any = {};

        if (!formData.childName) newErrors.childName = "아이 이름을 입력해주세요.";
        if (!formData.birth) newErrors.birth = "생년월일을 입력해주세요.";
        if (!selectedGender) newErrors.gender = "성별을 선택해주세요.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("폼 제출 완료:", { ...formData, gender: selectedGender });
        }
    };

    return (
        <Wrapper>
            {/* Step Indicator */}
            <StepIndicator>
                <AccountIcon width={60} height={60} />
                <Title>계정 만들기</Title>
                <StepWrapper>
                    <CheckIcon width={35} height={35} />
                    <StepLine />
                    <RedIcon width={35} height={35} />
                    <StepLabel>계정 정보</StepLabel>
                </StepWrapper>
            </StepIndicator>

            <InputWrapper>
                <Input
                    label="아이 이름"
                    name="childName"
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="아이 이름을 입력하세요"
                    error={errors.childName}
                />

                <Input
                    label="생년월일"
                    name="birth"
                    value={formData.birth}
                    onChange={handleChange}
                    placeholder="8자로 입력하세요 (예: 20081008)"
                    error={errors.birth}
                />

                {/* 성별 선택 */}
                <GenderWrapper>
                    <Label>성별</Label>
                    <GenderGroup>
                        <GenderBox
                            $selected={selectedGender === "M"}
                            onClick={() => setSelectedGender("M")}
                        >
                            <MaleIcon width={35} height={35} />
                            <span>남아</span>
                        </GenderBox>

                        <GenderBox
                            $selected={selectedGender === "F"}
                            onClick={() => setSelectedGender("F")}
                        >
                            <FemaleIcon width={35} height={35} />
                            <span>여아</span>
                        </GenderBox>
                    </GenderGroup>
                    {!selectedGender && <ErrorText>성별을 선택해주세요</ErrorText>}
                </GenderWrapper>
            </InputWrapper>

            {/* 버튼 영역 */}
            <ButtonRow>
                <Button variant="gray" onClick={prevStep}>
                    이전
                </Button>
                <Button onClick={handleSubmit}>가입 완료</Button>
            </ButtonRow>
            <LoginText>
                이미 계정이 있으신가요?{" "}
                <LoginLink onClick={() => navigate(ROUTES.LOGIN)}>
                    로그인하기
                </LoginLink>
            </LoginText>
        </Wrapper>
    );
};

export default SignupChildStep;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

/* Step Indicator */
const StepIndicator = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 34px;
    gap: 18px;
`;

const Title = styled.p`
    font-size: 22px;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textPrimary};
`;

const StepWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
`;

const StepLine = styled.div`
    width: 30px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.primary[600]};
`;

const StepLabel = styled.span`
    font-size: 18px;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 5px;
`;

/* Input & Gender */
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const GenderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Label = styled.p`
    font-size: ${({ theme }) => theme.typography.sizes.md};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-left: 9px;
`;

const GenderGroup = styled.div`
    display: flex;
    gap: 15px;
`;

const GenderBox = styled.div<{ $selected: boolean }>`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 22px 0;
    border-radius: ${({ theme }) => theme.radius.md};
    border: 1px solid ${({ theme }) => theme.colors.primary[500]};
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    span {
        margin-top: 6px;
        font-size: ${({ theme }) => theme.typography.sizes.md};
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    ${({ $selected, theme }) =>
        $selected &&
        css`
        border-color: ${theme.colors.primary[500]};
        background-color: ${theme.colors.primary[400]};
        `}
`;

const ErrorText = styled.span`
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.primary[600]};
`;

/* Buttons */
const ButtonRow = styled.div`
    display: flex;
    gap: 15px;
    margin-top: 49px;

    button {
        flex: 1;
        height: 55px;
        border-radius: ${({ theme }) => theme.radius.md};
        font-size: 20px;
    }
`;

const LoginText = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 28px;
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const LoginLink = styled.span`
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.primary[600]};
    cursor: pointer;
`;