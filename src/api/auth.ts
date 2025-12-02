import { api } from "../api/axios";

export interface registerUser {
    user: {
        name: string;
        password: string;
    };
    child: {
        name: string;
        birthdate: string;
        gender: "MALE" | "FEMALE";
    };
}

export const checkDuplicateId = async (loginId: string) => {
    const res = await api.get(`/auth/check-name`, {
        params: { loginId: loginId }
    });
    return res.data;
};

export const registerUser = async (form: registerUser) => {
    try {
        console.log("🚀 요청 보냄:", form); // 데이터가 잘 들어왔는지 확인
        const response = await api.post("/auth/register", form);
        console.log("✅ 응답 성공:", response);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const login = async (loginId: string, password: string) => {
    try {
        const res = await api.post("/auth/login", {
            loginId,
            password
        });
        return res.data;
    } catch (error: any) {
        console.error("로그인 실패");
        throw error;
    }
}

export const getMyInfo = async () => {
    const res = await api.get('/my-page');
    return res.data.data;
}