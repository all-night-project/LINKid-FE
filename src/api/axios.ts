import axios from "axios";

export const api = axios.create({
    baseURL: "https://54.116.22.29.nip.io/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});