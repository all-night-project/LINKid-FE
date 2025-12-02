import axios from "axios";

export const api = axios.create({
    baseURL: "https://54.116.22.29.nip.io/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    // 인증이 필요 없는 URL
    const noAuthUrls = [
        "/auth/login",
        "/auth/register",
        "/auth/check-name",
    ];

    // 현재 요청 URL이 인증 제외 URL이면 토큰 추가하지 않음
    if (noAuthUrls.some(url => config.url?.includes(url))) {
        return config;
    }

    // 나머지 요청에는 토큰 자동 추가
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});