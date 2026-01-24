
import { api } from "./axios";
import type { CreateHealthCheckPayload } from "../types/CreateHealthCheckPaylod";
import type { HealthCheck } from "../types/HealthCheck";

export const addHealthCheck = async(
    id: string, payload: CreateHealthCheckPayload
) : Promise<HealthCheck> => {
    const response = await api.post(`/${id}/new-health-check`, payload);
    return response.data;
};

