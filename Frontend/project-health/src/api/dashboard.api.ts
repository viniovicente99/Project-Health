import { api } from "./axios";
import type { SummaryResponse } from "../types/Summary";

export const getSummary = async(): Promise<SummaryResponse> => {
    const response = await api.get('/health-checks/sum');
    return response.data.response;
};

export const getSummaryById = async(id: string): Promise<SummaryResponse> => {
    const response = await api.get(`/${id}/health-checks/sum`);
    return response.data.response;
};