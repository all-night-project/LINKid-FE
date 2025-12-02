import { api } from "./axios";

export const getReportDetail = async (reportId: number) => {
    const res = await api.get(`/reports/${reportId}`);
    return res.data.data;
};

export const getMyReport = async () => {
    const res = await api.get('reports');
    return res.data.data;
};