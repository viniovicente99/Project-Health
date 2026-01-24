import { useState } from "react";
import { addHealthCheck } from "../api/healtcheck.api";
import type { HealthCheck } from "../types/HealthCheck";
import type { CreateHealthCheckPayload } from "../types/CreateHealthCheckPaylod";

export function useHealthCheck() {
    const [loading, setLoading] = useState(false);

    const createHealthCheck = async (
        id: string,
        payload: CreateHealthCheckPayload
    ): Promise<HealthCheck | null> => {
        setLoading(true);
        try {
            const data = await addHealthCheck(id, payload);
            return data;
        } finally {
            setLoading(false);
        }
    };

    return {
        createHealthCheck,
        loading
    };
};
