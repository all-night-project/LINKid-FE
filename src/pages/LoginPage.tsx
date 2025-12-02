import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { ROUTES } from "../router/routes";

import { login } from "../api/auth";

const LoginButton = styled(Button)`
    width: 100%;
    height: 55px;
    border-radius: ${({ theme }) => theme.radius.md};
    font-size: 22px;
    margin-top: 49px;
`
const LoginPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            setError("아이디를 다시 입력해주세요.");
            return;
        }
        if (!password) {
            setError("비밀번호를 다시 입력해주세요.");
            return;
        }

        try {
            console.log("🔥 로그인 요청:", { id, password });

            const data = await login(id, password); // API 호출
            console.log("✅ 로그인 성공:", data);

            localStorage.setItem("accessToken", data.data.accessToken);

            setError("");
            navigate(ROUTES.DASHBOARD);
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <Wrapper>
            <Logo>LINKid</Logo>

            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력하세요"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        error={error ? "아이디를 다시 입력해주세요" : undefined}
                    />

                    <Input
                        label="비밀번호"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error ? "비밀번호를 다시 입력해주세요" : undefined}
                    />

                    <LoginButton type="submit">로그인</LoginButton>
                </Form>

                <SignupText>
                    계정이 없으신가요?{" "}
                    <SignupLink onClick={() => navigate(ROUTES.SIGNUP)}>
                        회원가입하기
                    </SignupLink>
                </SignupText>
            </Container>
        </Wrapper>
    );
};

export default LoginPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`;

const Logo = styled.h1`
    font-size: 5.4rem;
    margin-left: 13px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
    background-color: white;
    width: 100%;
    height: 420px;
    border-radius: 27px;
    box-shadow: 0px 4px 4px rgba(222, 216, 208, 0.2);
`;


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const SignupText = styled.p`
    display: flex;
    justify-content: center;
    margin-top: 28px;
    font-size: 1.5rem;
    font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const SignupLink = styled.span`
    margin-left: 5px;
    color: ${({ theme }) => theme.colors.primary[600]};
    cursor: pointer;
`;