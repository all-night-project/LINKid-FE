export const getMyReport = async () => {
    const res = await api.get('reports');
    return res.data.data;
};