
export interface CreateHealthCheckPayload{
    comment: string;
    indicators: Array<{
        type: string,
        status: string,
    }>;
};