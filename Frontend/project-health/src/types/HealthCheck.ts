import type { HealthIndicator } from "./HealthIndicator";

export interface HealthCheck {
    id: string;
    project_id: string;
    general_status: string;
    comment: string;
    created_at: string;
    updated_at: string;
    HealthIndicators: HealthIndicator[];

};