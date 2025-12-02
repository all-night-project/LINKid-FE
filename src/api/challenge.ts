import { api } from "./axios";

export const createChallenge = async (reportId: number) => {
    const res = await api.post("/challenges/accept", {
        reportId,
    });
    return res.data;
}
export const getMyChallenge = async (status: string) => {
    const res = await api.get(`/challenges`, {
        params: { status: status }
    });
    return res.data.data;
}

export const getChallengeDetail = async (challengeId: number) => {
    const res = await api.get(`/challenges/${challengeId}`);
    return res.data.data;
}

export const submitMemo = async (actionId: number, memo: string) => {
    const res = await api.post(`/challenges/actions/${actionId}/complete`, {
        memo,
    });
    return res.data;
}