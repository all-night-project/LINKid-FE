import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import AccountIcon from "../../assets/icons/accounts.svg?react";
import CounterIcon1 from "../../assets/icons/counter_1.svg?react";
import CounterIcon2 from "../../assets/icons/counter_2.svg?react";
import { ROUTES } from "../../router/routes"
import { checkDuplicateId } from "../../api/auth";

const NextButton = styled(Button)`
    width: 100%;
    height: 55px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: 20px;
    margin-top: 49px;
`;

const SignupAccountStep = ({ formData, setFormData, nextStep }: any) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        id: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleNext = async () => {
        const newErrors: any = {};

        if (!formData.id) newErrors.id = "아이디를 다시 입력해주세요.";
        if (!formData.password) newErrors.password = "비밀번호를 다시 입력해주세요.";
        if (!formData.confirmPassword)
            newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
        if (!formData.name) newErrors.name = "이름을 입력해주세요.";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // 아이디 중복 체크 호출
        try {
            const res = await checkDuplicateId(formData.id);

            if (!res.success || !res.data?.available) {
                setErrors((prev: any) => ({
                    ...prev,
                    id: res.message || "이미 존재하는 아이디입니다."
                }));
                return;
            }

            nextStep();
        } catch (err) {
            console.error(err);
            setErrors((prev: any) => ({
                ...prev,
                id: "아이디 중복 확인 중 오류가 발생했습니다."
            }));
        }
    };

    return (
        <Wrapper>
            {/* StepIndicator */}
            <StepIndicator>
                <AccountIcon width={60} height={60} />
                <Title>계정 만들기</Title>
                <StepWrapper>
                    <CounterIcon1 width={35} height={35} />
                    <StepLine />
                    <CounterIcon2 width={35} height={35} />
                    <StepLabel>계정 정보</StepLabel>
                </StepWrapper>
            </StepIndicator>

            <InputWrapper>
                <Input
                    label="아이디"
                    name="id"
                    placeholder="사용할 아이디를 입력하세요"
                    value={formData.id}
                    onChange={handleChange}
                    error={errors.id}
                />

                <Input
                    label="비밀번호"
                    name="password"
                    type="password"
                    placeholder="8자 이상의 비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                <Input
                    label="비밀번호 확인"
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <Input
                    label="이름"
                    name="name"
                    placeholder="실명을 입력하세요"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                />
            </InputWrapper>

            <NextButton onClick={handleNext}>다음</NextButton>
            <LoginText>
                이미 계정이 있으신가요?{" "}
                <LoginLink onClick={() => navigate(ROUTES.LOGIN)}>
                    로그인하기
                </LoginLink>
            </LoginText>
        </Wrapper>
    );
};

export default SignupAccountStep;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

// StepIndicator
const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 34px;
  gap: 18px;
`;

const Title = styled.p`
    font-size: 2.2rem;
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
    background-color: ${({ theme }) => theme.colors.primary[500]};
`;

const StepLabel = styled.span`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-left: 5px;
`;

// Input
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const LoginText = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 28px;
    font-size: 1.4rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const LoginLink = styled.span`
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.primary[600]};
    cursor: pointer;
`;