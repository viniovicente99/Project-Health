import type { HealthCheck } from "./HealthCheck";

export interface Project {
    id: string;
    name: string;
    area: string;
    responsible: string;
    start_date: string;
    expected_end_date: string;
    createdAt?: string;
    updatedAt?: string;
    HealthChecks?: HealthCheck[]    
};